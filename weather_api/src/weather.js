import React, { useEffect, useState } from 'react';
import FutureWeather from './futureWeather';
import { ReactComponent as SunnyIcon } from "./images/sunny.svg"
import MaxTemperatureIcon from "./images/max_temperature.svg";
import MinTemperatureIcon from "./images/min_temperature.svg";
import UvIcon from "./images/uv.svg";
import WindSpeedIcon from "./images/wind_speed.svg";
import HumidityIcon from "./images/humidity.svg";
import ReLoadIcon from "./images/reload.svg";
import PopIcon from "./images/pop.svg";
import styled from "@emotion/styled";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const WeatherDiv = styled.div`
    min-width: 400px;
    height: 800px;
    margin-top: 20px;
    box-shadow: 0 1px 3px 0 #999999;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 0 15px;
`;

const WeatherImg = styled.div`
    min-width: 400px;
    margin-top: -5px;
    text-align: center;
    height: 160px;
    line-height: 160px;
    border-radius: 10px;
    background-image: url(./img/weather.png);
`;

const WeatherCard = styled.div`
    margin-top: 15px;
    min-width: 400px;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 5px 15px;
`;

const LocationTime = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
`;

const Span = styled.span`
    font-size: 18px;
    font-weight: bolder;
`;

const TemperatureDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Temperature = styled.div`
    font-size: 60px;
`;

const Sunny = styled.div`
    display: inline-block;
    vertical-align: middle;
    svg {
        width: 60px;
        height: auto;
    }
`;

const MaxMinTemperature = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 20%;
`;

const MaxTemperature = styled.span`
    display: flex;
    margin-right: 20px;
`;

const MinTemperature = styled.span`
    display: flex;
    margin-right: 20px;
`;

const WeatherElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #d0d0d0;
    &:last-child{
        border:none;
    }
    img {
        width: 25px;
        margin-right: 10px;
    }
`;

const Img = styled.span`
    display: flex;
    align-items: center;
`;

const ReLoadDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 15px;
    min-width: 400px;
    padding: 5px 15px;
    img {
        width: 25px;
        margin-left: 10px;
        cursor: pointer;
    }
`;

const WeekCard = styled.div`
    width: 430px;
    margin-top: 15px;
`;

const WeekUl = styled.ul`
    width: 1200px;
    height: 200px;
`;

const WeekElement = styled.li`
    user-select: none;
    margin-right: 100px;
    display: inline-block;
    background-color: #f9f9f9;
    border-radius: 10px;
    width: 150px;
    height: 190px;
    padding: 5px 15px;
    span {
        display: block;
    }
    img {
        width: 25px;
    }
`;

const Weather = () => {
    // 未來一周天氣預報
    const [nextWeekWeather, setNextWeekWeather] = useState({
        future: [
            {
                PoP: "降雨機率",
                Wx: "氣象描述",
                MaxT: "最高溫度",
                MinT: "最低溫度",
                UVI: "紫外線指數"
            }
        ]
    });

    // 現在天氣觀測報告
    const [currentWeather, setCurrentWeather] = useState({
        // observationTime: "2022/3/11 16:28:00",
        // locationName: "臺中市",
        // description: "晴朗",
        // temperature: 26,
        // minTemperature: 15,
        // maxTemperature: 27
    });


    // 進入畫面即載入資料
    useEffect(() => {
        getNextWeekData();
        getCurrentData();
        // 重新渲染後 dependencies 元素沒變則不執行
    }, []);

    const getNextWeekData = () => {
        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-946AA758-015A-4355-9AB4-040115765F90&locationName=%E8%87%BA%E4%B8%AD%E5%B8%82";
        fetch(
            url
        )
            .then(
                res => res.json()
            )
            .then(
                (data) => {
                    const locationData = data.records.locations[0].location[0].weatherElement;
                    // const weatherElements = locationData.map(
                    //     (item, index) => {
                    //         if(["PoP12h","Wx","MinT","MaxT","UVI"].includes(item.elementName)){
                    //             return item.time;

                    //     }

                    //         }

                    // );
                    let PoP = locationData.filter(x => x.elementName === "PoP12h")[0].time;
                    let Wx = locationData.filter(x => x.elementName === "Wx")[0].time;
                    let MinT = locationData.filter(x => x.elementName === "MinT")[0].time;
                    let MaxT = locationData.filter(x => x.elementName === "MaxT")[0].time;
                    let UVI = locationData.filter(x => x.elementName === "UVI")[0].time;
                    console.log(PoP[2].elementValue[0].value)
                    console.log(Wx)
                    console.log(MinT[2].elementValue[0].value)
                    console.log(MaxT[2].elementValue[0].value)
                    console.log(UVI)


                    setNextWeekWeather({
                        future: [
                            {
                                PoP: PoP[2].elementValue[0].value / PoP[3].elementValue[0].value,
                                Wx: Wx[3].elementValue[0].value,
                                MaxT: MaxT[2].elementValue[0].value / MaxT[3].elementValue[0].value,
                                MinT: MinT[2].elementValue[0].value / MinT[3].elementValue[0].value,
                                UVI: UVI[1].elementValue[0].value
                            }
                            ,
                            {
                                PoP: PoP[4].elementValue[0].value / PoP[5].elementValue[0].value,
                                Wx: Wx[5].elementValue[0].value,
                                MaxT: MaxT[4].elementValue[0].value / MaxT[5].elementValue[0].value,
                                MinT: MinT[4].elementValue[0].value / MinT[5].elementValue[0].value,
                                UVI: UVI[2].elementValue[0].value
                            }
                            ,
                            {
                                PoP: PoP[6].elementValue[0].value / PoP[7].elementValue[0].value,
                                Wx: Wx[7].elementValue[0].value,
                                MaxT: MaxT[6].elementValue[0].value / MaxT[7].elementValue[0].value,
                                MinT: MinT[6].elementValue[0].value / MinT[7].elementValue[0].value,
                                UVI: UVI[3].elementValue[0].value
                            }
                            ,
                            {
                                PoP: PoP[8].elementValue[0].value / PoP[9].elementValue[0].value,
                                Wx: Wx[9].elementValue[0].value,
                                MaxT: MaxT[8].elementValue[0].value / MaxT[9].elementValue[0].value,
                                MinT: MinT[8].elementValue[0].value / MinT[9].elementValue[0].value,
                                UVI: UVI[4].elementValue[0].value
                            }
                            ,
                            {
                                PoP: PoP[10].elementValue[0].value / PoP[11].elementValue[0].value,
                                Wx: Wx[11].elementValue[0].value,
                                MaxT: MaxT[10].elementValue[0].value / MaxT[11].elementValue[0].value,
                                MinT: MinT[10].elementValue[0].value / MinT[11].elementValue[0].value,
                                UVI: UVI[5].elementValue[0].value
                            }
                            ,
                            {
                                PoP: PoP[12].elementValue[0].value / PoP[13].elementValue[0].value,
                                Wx: Wx[13].elementValue[0].value,
                                MaxT: MaxT[12].elementValue[0].value / MaxT[13].elementValue[0].value,
                                MinT: MinT[12].elementValue[0].value / MinT[13].elementValue[0].value,
                                UVI: UVI[6].elementValue[0].value
                            }
                        ]
                    })
                }
            )


    }

    const getCurrentData = () => {
        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-946AA758-015A-4355-9AB4-040115765F90&locationName=臺中";
        fetch(
            url
        )
            .then(
                res => res.json()
            )
            .then(
                (data) => {
                    // console.log("data:", data.records.location[0]);
                    const locationData = data.records.location[0];
                    const weatherElements = locationData.weatherElement.reduce(
                        (element, item) => {
                            if (["WDSD", "TEMP", "HUMD", "H_UVI", "D_TX", "D_TN", "Weather"].includes(item.elementName)) {
                                element[item.elementName] = item.elementValue;
                            }
                            return element;
                        });
                    // 風速(公尺/秒) 溫度 相對溼度 小時紫外線指數 本日最高溫 本日最低溫 十分鐘天氣現象描述 縣市 鄉鎮
                    // WDSD TEMP HUMD H_UVI D_TX D_TN Weather CITY TOWN
                    setCurrentWeather((prevState)=>({
                        ...prevState,
                        observationTime: locationData.time.obsTime,
                        locationName: locationData.locationName,
                        description: weatherElements.Weather,
                        temperature: weatherElements.TEMP,
                        minTemperature: weatherElements.D_TN,
                        maxTemperature: weatherElements.D_TX,
                        uv: weatherElements.H_UVI,
                        windSpeed: weatherElements.WDSD,
                        humidity: weatherElements.HUMD
                    }))
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    return (
        <Container>
            <WeatherDiv>
                <WeatherImg>
                    <h1>氣象</h1>
                </WeatherImg>
                <WeatherCard>
                    <LocationTime>
                        <Span>{currentWeather.locationName}市</Span>
                        <span>
                            {/* Intl API 顯示目前時間 */}
                            {new Intl.DateTimeFormat("zh-TW", {
                                month: "numeric",
                                day: "numeric",
                                weekday: "long",
                                hour: "numeric",
                                minute: "numeric",
                            }).format(new Date(Date.now()))}
                        </span>
                    </LocationTime>
                    <TemperatureDiv>
                        <Temperature>
                            <Sunny>
                                <SunnyIcon />
                            </Sunny>
                            {Math.round(currentWeather.temperature)}°
                        </Temperature>
                        <MaxMinTemperature>
                            {currentWeather.description}
                            <MaxTemperature>
                                <img src={MaxTemperatureIcon} alt="最高溫度" />{Math.round(currentWeather.maxTemperature)}°
                            </MaxTemperature>
                            <MinTemperature>
                                <img src={MinTemperatureIcon} alt="最低溫度" />{Math.round(currentWeather.minTemperature)}°
                            </MinTemperature>
                        </MaxMinTemperature>
                    </TemperatureDiv>
                </WeatherCard>
                <WeatherCard>
                    <WeatherElement>
                        <Img>
                            <img src={UvIcon} alt="紫外線指數" />紫外線指數
                        </Img>
                        {Math.round(currentWeather.uv)}
                    </WeatherElement>
                    <WeatherElement>
                        <Img>
                            <img src={WindSpeedIcon} alt="風速" />風速
                        </Img>
                        {Math.round(currentWeather.windSpeed)}公尺/秒
                    </WeatherElement>
                    <WeatherElement>
                        <Img>
                            <img src={HumidityIcon} alt="濕度" />濕度
                        </Img>
                        {Math.round(currentWeather.humidity * 100)}%
                    </WeatherElement>
                </WeatherCard>
                <ReLoadDiv>
                    <span>最後觀測時間:{currentWeather.observationTime}</span>
                    <img src={ReLoadIcon} onClick={getCurrentData} alt="重取資料" />
                </ReLoadDiv>

                <FutureWeather />
            </WeatherDiv>
        </Container>
    )
};

export default Weather;