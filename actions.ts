'use server'

import { HeroData, MatchResponse, NewsPost, NewsPostList, UserPreferences } from 'lib/types';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from "zod";
import { currentTeamConfig } from './config/teamConfig';
import { CombinedTeamData, RosterData, StaffMember } from './lib/types/roster';


export async function fetchTeamData(): Promise<CombinedTeamData> {
  if (!currentTeamConfig) {
    notFound();
  }
  const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f';
  const baseUrl =  'https://api.seawolves.envorso.com/v1/teams';
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17'
    }
  };
  try {
    const [rosterResponse, staffResponse] = await Promise.all([
      fetch(`${baseUrl}/${teamId}/roster`, requestConfig),
      fetch(`${baseUrl}/${teamId}/staff`, requestConfig)
    ]);
    if (!rosterResponse.ok || !staffResponse.ok) {
      throw new Error(
        `Failed to fetch data: ${!rosterResponse.ok ? 'roster' : ''} ${!staffResponse.ok ? 'staff' : ''
        }`
      );
    }
    const [roster, staff] = await Promise.all([
      rosterResponse.json(),
      staffResponse.json()
    ]);
    return {
      roster,
      staff
    };
  } catch (error) {
    console.log('Error fetching team data:', error);
    notFound();
  }
}



export async function   getNewsPosts(): Promise<NewsPostList[]> {
  try {
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/articles?teamId=${currentTeamConfig?.teamId}&status=published`, // Add limit parameter to the URL
      {
        headers: {
          'x-client-app-version': '2.0.17'
        },
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch news posts');
    }
    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error('Error fetching news posts:', error);
    notFound(); // This will render the closest not-found page
  }
}



export async function getNewsPostById(id: string): Promise<NewsPost> {
  try {
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/articles/${id}`,
      {
        headers: {
          'x-client-app-version': '2.0.17'
        },
        next: { revalidate: 3600 }
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch news post with id: ${id}`);
    }
    const post = await response.json();

    return post;
  } catch (error) {
    console.error(`Error fetching news post with id ${id}:`, error);
    notFound();
  }
}

export async function updateHeroData(data: HeroData) {
  if (!currentTeamConfig?.teamId) {
    throw new Error('Team ID not found in configuration');
  }

  try {
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/panel/config?teamId=${currentTeamConfig.teamId}`,
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: 'heroData',
          value: {
            title: data.title,
            subtitle: data.subtitle,
            ctaPrimary: data.ctaPrimary,
            ctaSecondary: data.ctaSecondary,
            homePageVideoUrl: data.homePageVideoUrl
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update hero data');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating hero data:', error);
    throw error;
  }
}


export async function getRelatedArticles(currentArticleId: string, limit: number = 3): Promise<NewsPost[]> {
  try {
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/articles?teamId=${currentTeamConfig?.teamId}&limit=${limit + 1}`, // Fetch one extra to account for possible current article
      {
        headers: {
          'x-client-app-version': '2.0.17'
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch related articles');
    }

    const allPosts = await response.json();

    // Filter out the current article and limit the results
    const relatedPosts = allPosts
      .filter((post: NewsPost) => post.id !== currentArticleId)
      .slice(0, limit);

    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return []; // Return empty array instead of notFound() to handle this more gracefully
  }
}




async function getStandingsData() {
  const res = await fetch(
    'https://api.seawolves.envorso.com/v1/standings?teamId=034db172-942f-48b8-bc91-a0b3eb3a025f',
    {
      next: { tags: ['standings'] } // Enable tag-based revalidation
    }
  );

  if (!res.ok) throw new Error('Failed to fetch standings data');

  return res.json();
}



export async function getMatchById(id: string) {
  try {
    // Validate the match ID

    // Fetch the match data
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/matches/${id}?responseType=preview`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache the response for 60 seconds
        next: {
          revalidate: 60,
        },
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }

    }

    // Parse the response
    const data: MatchResponse = await response.json();

    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
    }


    // Log unexpected errors but don't expose details to client
    console.error('Unexpected error fetching match:', error);

  }
}


async function fetchPlayer(id: string) {
  try {
    const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f'; // Define the team ID
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/teams/${teamId}/roster/${id}`, // Use the new endpoint
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    


    const playerData = await response.json();
    return NextResponse.json(playerData);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export { fetchPlayer };




export async function saveUserPreferences(data: UserPreferences) {
  const cookieStore = await cookies();

  cookieStore.set('userPreferences', JSON.stringify(data), {
    maxAge: 60 * 60 * 24 * 7, // 1 week (in seconds)
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  });
}

export async function getUserPreferences() {
  const cookieStore = await cookies();
  const prefs = cookieStore.get('userPreferences');
  return prefs ? JSON.parse(prefs.value) : null;
}

export async function clearUserPreferences() {
  const cookieStore = await cookies();
  cookieStore.delete('userPreferences');

}

export async function getHeroData() {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

  try {
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/panel/config/034db172-942f-48b8-bc91-a0b3eb3a025f`,
      {
        headers: {
          'accept': 'application/json',
        },
      }
    );



    const data = await response.json();
    console.log("data", data)
    return data;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export async function fetchCoachData(): Promise<StaffMember[]> {
  const baseUrl = 'https://api.seawolves.envorso.com/v1/teams';
  const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f';
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17',
    },
  };

  try {
    const response = await fetch(`${baseUrl}/${teamId}/staff`, requestConfig);

    if (!response.ok) {
      throw new Error('Failed to fetch roster data');
    }

    const rosterData: StaffMember[] = await response.json();

    // Filter for staff members where is_coach is true
    const coaches = rosterData.filter((staff) => staff.is_coach);
    return coaches;
  } catch (error) {
    console.error('Error fetching coach data:', error);
    throw error;
  }
}

export async function fetchRosterData(): Promise<RosterData> {
  const baseUrl = 'https://api.seawolves.envorso.com/v1/teams';
  const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f';
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17'
    }
  };

  if (!currentTeamConfig) {
    notFound();
  }

  try {
    const response = await fetch(
      `${baseUrl}/${teamId}/roster`,
      requestConfig
    );

    if (!response.ok) {
      throw new Error('Failed to fetch roster data');
    }

    return await response.json();
  } catch (error) {
    console.log('Error fetching roster data:', error);
    notFound();
  }
}

export async function fetchStaffData(): Promise<StaffMember[]> {
  const baseUrl = 'https://api.seawolves.envorso.com/v1/teams';
  const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f';
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17'
    }
  };
  if (!currentTeamConfig) {
    notFound();
  }

  try {
    const response = await fetch(
      `${baseUrl}/${teamId}/staff`,
      requestConfig
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }

    const staffData: StaffMember[] = await response.json();
    // Filter staff data to only include coaches
    const coaches = staffData.filter((staff) => staff.is_coach);
    return coaches;
  } catch (error) {
    console.log('Error fetching staff data:', error);
    notFound();
  }
}

async function fetchStaff(id: string) {
  try {
    const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f'; // Define the team ID
    const response = await fetch(
      `https://api.seawolves.envorso.com/v1/teams/${teamId}/staff/${id}`, // Use the new endpoint
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    


    const playerData = await response.json();
    return NextResponse.json(playerData);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export { fetchStaff };


export async function fetchFrontOfficeData(): Promise<StaffMember[]> {
  const baseUrl = 'https://api.seawolves.envorso.com/v1/teams';
  const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f';
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17'
    }
  };

  if (!currentTeamConfig) {
    notFound();
  }

  try {
    const response = await fetch(
      `${baseUrl}/${teamId}/staff`,
      requestConfig
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }

    const staffData: StaffMember[] = await response.json();
    
    // Filter for front office staff based on job titles
    const frontOfficeKeywords = [
      'CEO', 'President', 'COO', 'Marketing', 'Business', 
      'Operations', 'Sales', 'Communications', 'Manager',
      'Relations', 'Ticket'
    ];
    
    const frontOffice = staffData.filter(staff => 
      frontOfficeKeywords.some(keyword => 
        staff.job_title.toLowerCase().includes(keyword.toLowerCase())
      ) && !staff.is_coach
    );

    return frontOffice;
  } catch (error) {
    console.log('Error fetching staff data:', error);
    notFound();
  }
}

export async function fetchOperationsData(): Promise<StaffMember[]> {
  const baseUrl = 'https://api.seawolves.envorso.com/v1/teams';
  const teamId = '034db172-942f-48b8-bc91-a0b3eb3a025f';
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17'
    }
  };

  if (!currentTeamConfig) {
    notFound();
  }

  try {
    const response = await fetch(
      `${baseUrl}/${teamId}/staff`,
      requestConfig
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }

    const staffData: StaffMember[] = await response.json();
    
    const operationsKeywords = [
      'Trainer', 'Athletic', 'Medical', 'Physician', 'Doctor', 'Dr',
      'Physio', 'Rehabilitation', 'Chiropractor', 'Nutritionist',
      'Strength', 'Conditioning'
    ];
    
    const operations = staffData.filter(staff => 
      operationsKeywords.some(keyword => 
        staff.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
        staff.name.toLowerCase().startsWith('dr.')) && 
      !staff.is_coach
    );

    return operations;
  } catch (error) {
    console.log('Error fetching staff data:', error);
    notFound();
  }
}