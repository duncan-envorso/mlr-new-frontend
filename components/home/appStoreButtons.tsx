import { Button } from "@/components/ui/button";
import { HeroData, TeamConfig } from '@/lib/types';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';

type AppStoreProps = {
    currentTeamConfig: TeamConfig
    heroData: HeroData
}

const AppStoreButtons = ({ currentTeamConfig, heroData }: AppStoreProps) => {
    const [deviceType, setDeviceType] = useState<string>('android');

    useEffect(() => {
        const checkDeviceType = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const platform = window.navigator.platform.toLowerCase();

            // Check for iOS devices or macOS
            if (/iphone|ipad|ipod|mac/i.test(userAgent) || /mac/i.test(platform)) {
                setDeviceType('ios');
            }
        };

        checkDeviceType();
    }, []);

    const handleAppStoreClick = () => {
        const link = deviceType === 'ios' 
            ? currentTeamConfig.appStoreLinks.ios 
            : currentTeamConfig.appStoreLinks.android;
        
        window.open(link, '_blank');
    };

    return (
        <Button
            variant="outline"
            size="lg"
            onClick={handleAppStoreClick}
            className={`font-body w-full rounded-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white sm:w-auto`}
        >
            <Play className="mr-2 h-5 w-5" />
           Download App
        </Button>
    );
};

export default AppStoreButtons;