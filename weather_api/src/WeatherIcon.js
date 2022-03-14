import React, { useEffect, useMemo, useState } from 'react';
import styled from "@emotion/styled";
import { ReactComponent as SunIcon } from "./images/sun.svg";
import { ReactComponent as SunCloudyIcon } from "./images/sun_cloudy.svg";
import { ReactComponent as SunFogIcon } from "./images/sun_fog.svg";
import { ReactComponent as SunCloudyFogIcon } from "./images/sun_cloudy_fog.svg";
import { ReactComponent as SunPartiallyClearWithRainIcon } from "./images/sun_partially_clear_with_rain.svg";
import { ReactComponent as SunThunderstormIcon } from "./images/sun_thunderstorm.svg";
import { ReactComponent as SunSnowIcon } from "./images/sun_snow.svg";
import { ReactComponent as MoonIcon } from "./images/moon.svg";
import { ReactComponent as MoonCloudyIcon } from "./images/moon_cloudy.svg";
import { ReactComponent as MoonFogIcon } from "./images/moon_fog.svg";
import { ReactComponent as MoonCloudyFogIcon } from "./images/moon_cloudy_fog.svg";
import { ReactComponent as MoonPartiallyClearWithRainIcon } from "./images/moon_partially_clear_with_rain.svg";
import { ReactComponent as MoonThunderstormIcon } from "./images/moon_thunderstorm.svg";
import { ReactComponent as MoonSnowIcon } from "./images/moon_snow.svg";



const IconContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    svg {
        width: 65px;
        height: 65px;
    }
`;

const weatherTypes = {
    isClear: [1],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isCloudyFog: [25, 26, 27, 28],
    isPartiallyClearWithRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isSnow: [23, 37, 42]
};

const weatherIcons = {
    sun: {
        isClear: <SunIcon />,
        isCloudy: <SunCloudyIcon />,
        isFog: <SunFogIcon />,
        isCloudyFog: <SunCloudyFogIcon />,
        isPartiallyClearWithRain: <SunPartiallyClearWithRainIcon />,
        isThunderstorm: <SunThunderstormIcon />,
        isSnow: <SunSnowIcon />
    },
    moon: {
        isClear: <MoonIcon />,
        isCloudy: <MoonCloudyIcon />,
        isFog: <MoonFogIcon />,
        isCloudyFog: <MoonCloudyFogIcon />,
        isPartiallyClearWithRain: <MoonPartiallyClearWithRainIcon />,
        isThunderstorm: <MoonThunderstormIcon />,
        isSnow: <MoonSnowIcon />
    }
};

// 使用迴圈來找出該天氣代碼對應到的天氣型態
const findWeatherType = (weatherCode) => {
    const [weatherType] =
        Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
            weatherCodes.includes(Number(weatherCode))
        ) || [];

    return weatherType;
};



const WeatherIcon = ({ currentWeatherCode, moment }) => {
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState("isClear");

    const saveWeatherIcon = useMemo(() => 
        findWeatherType(currentWeatherCode), [currentWeatherCode]
    );

    useEffect(() => {
        setCurrentWeatherIcon(saveWeatherIcon);
    }, [saveWeatherIcon]);

    return (
        <IconContainer>
            {weatherIcons[moment][currentWeatherIcon]}
        </IconContainer>
    )
};

export default WeatherIcon;