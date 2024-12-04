import { Card, CardContent } from '@/components/ui/card';

const PartnersPage = () => {
  const sections = [
    {
      title: "Partners",
      partners: [
        {
            name: "Envorso",
            logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/04/Envorso-Logo.jpg",
            description: "Envorso, a trusted advisor to Fortune 500 companies, delivers software and systems consulting, engineering excellence and training services to drive innovation, modernization and critical changes",
            url: "https://envorso.com/"
          },
        {
          name: "WaFd Bank",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/WaFd.png",
          description: "WaFd Bank has been investing in our communities for more than 100 years. We've grown to become one of the largest commercial lenders in the state helping businesses big and small thrive. We're still that reliable next-door neighbor you can count on. We helped thousands of local businesses get through the pandemic and offer an array of personal checking and savings products along with digital tools so you can better manage your money. See why Newsweek awarded us best Big Bank in Washington state three seasons in a row. WaFd Bank and the Seawolves, Together We Hunt!",
          url: "https://www.wafdbank.com/"
        },
        {
          name: "Virginia Mason Franciscan Health",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/VMFH_Logo_Hori_Full_Color_RGB-01-002.png",
          description: "Virginia Mason Franciscan Health is an integrated health system serving the Puget Sound region of Washington state, offering access to some of the country's most prestigious experts and hospitals that are internationally known for superior quality.",
          url: "http://vmfh.org/"
        },
        {
          name: "USI Insurance Services",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/USI_286.png",
          description: "Navigating today's complex risk environment requires information and analytical sophistication which many businesses and individuals don't receive from their current risk advisor. USI Insurance Services leverages a proprietary process to provide client's access to the insight and innovation of an entire risk management community, all focused on their specific needs.",
          url: "https://www.usi.com/"
        },
        {
          name: "Elysian Brewing",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/ElysianLogoNoHops_Black-01.png",
          description: "Elysian Brewing opened their doors in 1996 when bold art and music defined Seattle. They carry that same spirit in the way they brew their beer from shaking up classic styles, using unusual ingredients, and throwing off convention. Elysian is proud to be the Official Craft Beer Partner of the Seattle Seawolves.",
          url: "https://www.elysianbrewing.com/"
        },
        {
          name: "SEA CON LLC",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/04/SeaCon-logo-lg.jpg",
          description: "SEA CON LLC is the current operating entity of a construction organization that was formed in December 1975 and has operated continuously from that date as SEA CON LLC. The company offers consulting, management, and construction services to commercial/industrial building users.",
          url: "https://seaconllc.com/"
        },
        {
          name: "Penington Painting",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/04/PPC-Gold-Logo-Transparent-Background-HiRes.png",
          description: "A national painting and coatings contractor specializing in hi-tech, commercial and industrial manufacturing markets.",
          url: "https://peningtonpainting.com/"
        },
      
        {
          name: "Delta Air Lines",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/07/Delta_c_r.jpg",
          description: "Delta Air Lines, a leader in domestic and international travel, offers airline tickets & flights to over 300 destinations in 60 countries.",
          url: "https://www.delta.com"
        },
        {
          name: "Wing Dome",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/WingDome_Tagline_PMS7620C.png",
          description: "Seattle's Fire Since 1994 – Wings are our passion. Heat is our specialty. And it has been since 1994.",
          url: "https://thewingdome.com/events-promotions/"
        },
        {
          name: "Schilling Cider",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2023/11/Schilling-cider-logo.jpg",
          description: "All our beverages are handcrafted in the Pacific Northwest. We use 100% fresh-pressed apples, locally sourced ingredients, hand-selected yeast strains to create a cider experience that's truly unique.",
          url: "https://schillingcider.com/"
        }
      ]
    },
    {
      title: "Media Partners",
      partners: [
        {
          name: "ROOT SPORTS",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/Root_sports_logo.png",
          description: "ROOT SPORTS is the television home of the Seattle Mariners, Seattle Kraken, Portland Trail Blazers, Seattle Seahawks, Seattle Seawolves, and Gonzaga Bulldogs. The network delivers more than 400 live events each year across a five-state footprint.",
          url: "https://northwest.rootsports.com/"
        },
        {
          name: "The Rugby Network",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/TRN_Logo_white_background_transparent-e1615927597639.png",
          description: "The Rugby Network provides fans with a single destination for all their rugby content needs, including live streaming of select Major League Rugby matches, international matches, highlights, and exclusive behind-the-scenes content.",
          url: "https://www.therugbynetwork.com/"
        },
        {
          name: "FOX 13",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/03/fox-13-logo.png",
          description: "FOX 13 & FOX 13+ are also the preeminent home for local sports in Western Washington, with extensive coverage of the Seattle Seahawks (NFL) and Seattle Mariners (MLB).",
          url: "https://www.fox13news.com/"
        }
      ]
    },
    {
      title: "Community Partners",
      partners: [
        {
          name: "Special Olympics",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/08/Special_Olympics_Washington.jpg",
          description: "Through programming in sports, health, education and community building, Special Olympics is changing the lives of people with intellectual disabilities.",
          url: "https://www.specialolympics.org/"
        },
        {
          name: "Rugby Washington",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Pathways_10-2021_V4_RugbyWA-1.png",
          description: "Rugby Washington (Rugby WA) is a not-for-profit volunteer-based organization that provides athletic opportunities through the sport of rugby for the residents of the State of Washington.",
          url: "https://rugbywa.org/"
        },
        {
          name: "Loggers Rugby",
          logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/loggers.png",
          description: "For over 20 years, the Loggers have served as the representative side for aspiring boys and girls playing rugby in the Pacific Northwest.",
          url: "https://www.loggersrugby.org/"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Partners
        </h1>

        {sections.map((section, index) => (
          <div key={index} className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-2">
              {section.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.partners.map((partner, partnerIndex) => (
                <Card 
                  key={partnerIndex} 
                  className="hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  <CardContent className="p-6">
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="h-40 flex items-center justify-center mb-6 bg-white rounded-lg">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-h-32 w-auto object-contain"
                        />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {partner.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-4">
                        {partner.description}
                      </p>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16">
          <a 
            href="https://www.majorleague.rugby/sponsors/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View League Partners
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;