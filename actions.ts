'use server'

import { HeroData, MatchResponse, NewsPost, NewsPostList, UserPreferences } from 'lib/types';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from "zod";
import { currentTeamConfig } from './config/teamConfig';
import { CombinedTeamData, RosterData, StaffMember } from './lib/types/roster';

const API_URL = process.env.API_URL 
const TEAM_ID = '034db172-942f-48b8-bc91-a0b3eb3a025f';

export async function fetchTeamData(): Promise<CombinedTeamData> {
  if (!currentTeamConfig) {
    notFound();
  }
  
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17'
    }
  };
  try {
    const [rosterResponse, staffResponse] = await Promise.all([
      fetch(`${API_URL}/teams/${TEAM_ID}/roster`, requestConfig),
      fetch(`${API_URL}/teams/${TEAM_ID}/staff`, requestConfig)
    ]);
    if (!rosterResponse.ok || !staffResponse.ok) {
      throw new Error(
        `Failed to fetch data: ${!rosterResponse.ok ? 'roster' : ''} ${!staffResponse.ok ? 'staff' : ''}`
      );
    }
    const [roster, staff] = await Promise.all([
      rosterResponse.json(),
      staffResponse.json()
    ]);
    return { roster, staff };
  } catch (error) {
    console.log('Error fetching team data:', error);
    notFound();
  }
}

export async function getNewsPosts(): Promise<NewsPostList[]> {
  try {
    const response = await fetch(
      `${API_URL}/articles?teamId=${currentTeamConfig?.teamId}&status=published`,
      {
        headers: {
          'x-client-app-version': '2.0.17'
        },
        next: { revalidate: 3600 }
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch news posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching news posts:', error);
    notFound();
  }
}

export async function getNewsPostById(id: string): Promise<NewsPost> {
  try {
    const response = await fetch(
      `${API_URL}/articles/${id}`,
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
    return await response.json();
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
      `${API_URL}/panel/config?teamId=${currentTeamConfig.teamId}`,
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

    return await response.json();
  } catch (error) {
    console.error('Error updating hero data:', error);
    throw error;
  }
}

export async function getRelatedArticles(currentArticleId: string, limit: number = 3): Promise<NewsPost[]> {
  try {
    const response = await fetch(
      `${API_URL}/articles?teamId=${currentTeamConfig?.teamId}&limit=${limit + 1}`,
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
    return allPosts
      .filter((post: NewsPost) => post.id !== currentArticleId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}




export async function getMatchById(id: string) {
  try {
    const response = await fetch(
      `${API_URL}/matches/${id}?responseType=preview`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );


    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
    }

    const data: MatchResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
    }
    console.error('Unexpected error fetching match:', error);
  }
}

export async function fetchPlayer(id: string) {
  try {
    const response = await fetch(
      `${API_URL}/teams/${TEAM_ID}/roster/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
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

export async function getHeroData() {
  try {
    const response = await fetch(
      `${API_URL}/panel/config/${TEAM_ID}`,
      {
        headers: {
          'accept': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export async function fetchCoachData(): Promise<StaffMember[]> {
  const requestConfig = {
    headers: {
      'x-client-app-version': '2.0.17',
    },
  };

  try {
    const response = await fetch(`${API_URL}/teams/${TEAM_ID}/staff`, requestConfig);

    if (!response.ok) {
      throw new Error('Failed to fetch roster data');
    }

    const rosterData: StaffMember[] = await response.json();
    return rosterData.filter((staff) => staff.is_coach);
  } catch (error) {
    console.error('Error fetching coach data:', error);
    throw error;
  }
}

export async function fetchRosterData(): Promise<RosterData> {
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
      `${API_URL}/teams/${TEAM_ID}/roster`,
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
  const API_URL = process.env.API_URL
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
      `${API_URL}/teams/${TEAM_ID}/staff`,
      requestConfig
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }

    const staffData: StaffMember[] = await response.json();
    return staffData.filter((staff) => staff.is_coach);
  } catch (error) {
    console.log('Error fetching staff data:', error);
    notFound();
  }
}

export async function fetchStaff(id: string) {
  try {
    const response = await fetch(
      `${API_URL}/teams/${TEAM_ID}/staff/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
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

export async function fetchFrontOfficeData(): Promise<StaffMember[]> {
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
      `${API_URL}/teams/${TEAM_ID}/staff`,
      requestConfig
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }

    const staffData: StaffMember[] = await response.json();
    
    const frontOfficeKeywords = [
      'CEO', 'President', 'COO', 'Marketing', 'Business', 
      'Operations', 'Sales', 'Communications', 'Manager',
      'Relations', 'Ticket'
    ];
    
    return staffData.filter(staff => 
      frontOfficeKeywords.some(keyword => 
        staff.job_title.toLowerCase().includes(keyword.toLowerCase())
      ) && !staff.is_coach
    );
  } catch (error) {
    console.log('Error fetching staff data:', error);
    notFound();
  }
}

export async function fetchOperationsData(): Promise<StaffMember[]> {
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
      `${API_URL}/teams/${TEAM_ID}/staff`,
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
    
    return staffData.filter(staff => 
      operationsKeywords.some(keyword => 
        staff.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
        staff.name.toLowerCase().startsWith('dr.')) && 
      !staff.is_coach
    );
  } catch (error) {
    console.log('Error fetching staff data:', error);
    notFound();
  }
}


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

export async function getMatches(seasonId?: string) {
  try {
    const queryParams = new URLSearchParams({
      teamId: TEAM_ID
    });
    
    if (seasonId) {
      queryParams.append('seasonId', seasonId);
    }

    const response = await fetch(
      `${API_URL}/matches?${queryParams}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }

    const matches = await response.json(); // Read the response body once
    console.log("matches", matches); // Use the already read data

    return matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}



export async function fetchStandings(seasonId: string) {
  const API_URL = process.env.API_URL;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;


  if (!API_URL || !TEAM_ID) {
    throw new Error('Missing environment variables: API_URL or TEAM_ID');
  }

  const url = `${API_URL}/standings?seasonId=${seasonId}&teamId=${TEAM_ID}`;

  console.log('url', url)
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch standings: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}