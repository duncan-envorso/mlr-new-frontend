export interface Partner {
    name: string;
    description: string;
    logoUrl: string;
    websiteUrl: string;
    category: 'primary' | 'media' | 'community' | 'league';
  }
  
  export const sponsorsData: Partner[] = [
    {
      name: "WaFd Bank",
      description: "WaFd Bank has been investing in our communities for more than 100 years. We've grown to become one of the largest commercial lenders in the state helping businesses big and small thrive.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/WaFd.png",
      websiteUrl: "https://www.wafdbank.com",
      category: "primary"
    },
    {
      name: "Virginia Mason Franciscan Health",
      description: "Virginia Mason Franciscan Health is an integrated health system serving the Puget Sound region of Washington state, offering access to some of the country's most prestigious experts and hospitals.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/VMFH_Logo_Hori_Full_Color_RGB-01-002.png",
      websiteUrl: "http://vmfh.org",
      category: "primary"
    },
    {
      name: "Envorso",
      description: "Envorso, a trusted advisor to Fortune 500 companies, delivers software and systems consulting, engineering excellence and training services to drive innovation, modernization and critical changes",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/04/Envorso-Logo.jpg",
      websiteUrl: "https://envorso.com",
      category: "primary"
    },
    {
      name: "Root Sports",
      description: "ROOT SPORTS is the television home of the Seattle Mariners, Seattle Kraken, Portland Trail Blazers, Seattle Seahawks, Seattle Seawolves, and Gonzaga Bulldogs.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/Root_sports_logo.png",
      websiteUrl: "https://northwest.rootsports.com",
      category: "media"
    },
    {
      name: "The Rugby Network",
      description: "The Rugby Network provides fans with a single destination for all their rugby content needs, including live streaming of select Major League Rugby matches.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/TRN_Logo_white_background_transparent-e1615927597639.png",
      websiteUrl: "https://www.therugbynetwork.com",
      category: "media"
    },
    {
      name: "FOX 13",
      description: "FOX 13 & FOX 13+ are the preeminent home for local sports in Western Washington, with extensive coverage of local sports teams.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/03/fox-13-logo.png",
      websiteUrl: "",
      category: "media"
    },
    {
      name: "Brooks",
      description: "Brooks purpose is to inspire everyone to run their path. Because every day with a run is better.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/05/S24_LRT_Logo_BrooksPathText-01-e1716434100483.png",
      websiteUrl: "https://www.brooksrunning.com",
      category: "primary"
    },
    {
      name: "Dick's Drive-In",
      description: "Dick's Drive-In, a local, quick-service, walk-up style restaurant first opened on January 28, 1954, in the Wallingford neighborhood.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/02/Dicks_Script_2024_orange_LG.png",
      websiteUrl: "https://www.ddir.com",
      category: "primary"
    },
    {
      name: "Special Olympics Washington",
      description: "Through programming in sports, health, education and community building, Special Olympics is changing the lives of people with intellectual disabilities.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/Special_Olympics_Washington.jpg",
      websiteUrl: "https://www.specialolympics.org",
      category: "community"
    },
    {
      name: "Rugby Washington",
      description: "Rugby Washington (Rugby WA) is a not-for-profit volunteer-based organization that provides athletic opportunities through the sport of rugby for the residents of the State of Washington.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Pathways_10-2021_V4_RugbyWA-1.png",
      websiteUrl: "https://rugbywa.org",
      category: "community"
    },
    {
      name: "Delta Air Lines",
      description: "Delta Air Lines, a leader in domestic and international travel, offers airline tickets & flights to over 300 destinations in 60 countries.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/07/Delta_c_r.jpg",
      websiteUrl: "https://www.delta.com",
      category: "primary"
    },
    {
      name: "Elysian Brewing",
      description: "Elysian Brewing opened their doors in 1996 when bold art and music defined Seattle. They carry that same spirit in the way they brew their beer.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/ElysianLogoNoHops_Black-01.png",
      websiteUrl: "https://www.elysianbrewing.com",
      category: "primary"
    },
    {
      name: "Billy Baroo's Smokehouse",
      description: "Billy Baroo's Smokehouse is a locally owned small business operating since 2009. Located just 1 mile north of Starfire Sports at Foster Golf Links Tukwila.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2022/02/Seawolves_Opponent-Partners-MLR_Logos_BillySmokehouse-Combined.png",
      websiteUrl: "https://billybaroos.com",
      category: "primary"
    },
    {
      name: "Filson",
      description: "Founded in Seattle to outfit the 1897 Alaskan Gold Rush, where clothing and gear was a matter of survival. Today our commitment to making high-quality unfailing goods remains steadfast.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/02/filson-logo-tall-transparent_m4gckj-ezgif.com-webp-to-jpg-converter.jpg",
      websiteUrl: "https://www.filson.com",
      category: "primary"
    },
    {
      name: "Washington Athletic Club",
      description: "The Washington Athletic Club, the Official Athletic Club of the Seattle Seawolves, is a private social and athletic club located in downtown Seattle.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/02/WACwings_black-2.jpg",
      websiteUrl: "https://www.wac.net",
      category: "primary"
    },
    {
      name: "Great State Burger",
      description: "For conscientious meat-eaters, Great State Burger is the only fun fast-casual burger joint that combines the highest quality ingredients with a classic menu.",
      logoUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/02/10-e1709266894892.png",
      websiteUrl: "https://greatstateburger.com",
      category: "primary"
    }
  ];