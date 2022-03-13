import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import WeatherIcon from './WeatherIcon';
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

const ElementDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 20%;
`;

const ElementSpan = styled.span`
    margin-right: 5px;
`;

const MaxMinTemperature = styled.span`
    margin-right: 5px;
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
    width: 1600px;
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
                week: new Date(),
                PoP: "降雨機率",
                Wx: "氣象描述",
                WxCode: 1,
                MaxT: "最高溫度",
                MinT: "最低溫度",
                UVI: "紫外線指數"
            }
        ]
    });

    // 現在天氣觀測報告
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: "",
        locationName: "臺中",
        Wx: "",
        weatherCode: 1,
        CI: "",
        temperature: 0,
        minTemperature: 0,
        maxTemperature: 0
    });


    // 進入畫面即載入資料
    useEffect(() => {
        getNextWeekData();
        getCurrentData();
        getWeatherElement();
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
                    let PoP = locationData.filter(x => x.elementName === "PoP12h")[0].time;
                    let Wx = locationData.filter(x => x.elementName === "Wx")[0].time;
                    let MinT = locationData.filter(x => x.elementName === "MinT")[0].time;
                    let MaxT = locationData.filter(x => x.elementName === "MaxT")[0].time;
                    let UVI = locationData.filter(x => x.elementName === "UVI")[0].time;
                    
                    console.log(PoP)

                    setNextWeekWeather({
                        future: [
                            {
                                week: new Date(UVI[1].startTime),
                                PoP: (parseInt(PoP[2].elementValue[0].value) + parseInt(PoP[3].elementValue[0].value)) / 2 || 0,
                                Wx: Wx[3].elementValue[0].value,
                                WxCode: Wx[3].elementValue[1].value,
                                MaxT: (parseInt(MaxT[2].elementValue[0].value) + parseInt(MaxT[3].elementValue[0].value)) / 2,
                                MinT: (parseInt(MinT[2].elementValue[0].value) + parseInt(MinT[3].elementValue[0].value)) / 2,
                                UVI: UVI[1].elementValue[0].value
                            }
                            ,
                            {
                                week: new Date(UVI[2].startTime),
                                PoP: (parseInt(PoP[4].elementValue[0].value) + parseInt(PoP[5].elementValue[0].value)) / 2 || 0,
                                Wx: Wx[5].elementValue[0].value,
                                WxCode: Wx[5].elementValue[1].value,
                                MaxT: (parseInt(MaxT[4].elementValue[0].value) + parseInt(MaxT[5].elementValue[0].value)) / 2,
                                MinT: (parseInt(MinT[4].elementValue[0].value) + parseInt(MinT[5].elementValue[0].value)) / 2,
                                UVI: UVI[2].elementValue[0].value
                            }
                            ,
                            {
                                week: new Date(UVI[3].startTime),
                                PoP: (parseInt(PoP[6].elementValue[0].value) + parseInt(PoP[7].elementValue[0].value)) / 2 || 0,
                                Wx: Wx[7].elementValue[0].value,
                                WxCode: Wx[7].elementValue[1].value,
                                MaxT: (parseInt(MaxT[6].elementValue[0].value) + parseInt(MaxT[7].elementValue[0].value)) / 2,
                                MinT: (parseInt(MinT[6].elementValue[0].value) + parseInt(MinT[7].elementValue[0].value)) / 2,
                                UVI: UVI[3].elementValue[0].value
                            }
                            ,
                            {
                                week: new Date(UVI[4].startTime),
                                PoP: (parseInt(PoP[8].elementValue[0].value) + parseInt(PoP[9].elementValue[0].value)) / 2 || 0,
                                Wx: Wx[9].elementValue[0].value,
                                WxCode: Wx[9].elementValue[1].value,
                                MaxT: (parseInt(MaxT[8].elementValue[0].value) + parseInt(MaxT[9].elementValue[0].value)) / 2,
                                MinT: (parseInt(MinT[8].elementValue[0].value) + parseInt(MinT[9].elementValue[0].value)) / 2,
                                UVI: UVI[4].elementValue[0].value
                            }
                            ,
                            {
                                week: new Date(UVI[5].startTime),
                                PoP: (parseInt(PoP[10].elementValue[0].value) + parseInt(PoP[11].elementValue[0].value)) / 2 || 0,
                                Wx: Wx[11].elementValue[0].value,
                                WxCode: Wx[11].elementValue[1].value,
                                MaxT: (parseInt(MaxT[10].elementValue[0].value) + parseInt(MaxT[11].elementValue[0].value)) / 2,
                                MinT: (parseInt(MinT[10].elementValue[0].value) + parseInt(MinT[11].elementValue[0].value)) / 2,
                                UVI: UVI[5].elementValue[0].value
                            }
                            ,
                            {
                                week: new Date(UVI[6].startTime),
                                PoP: (parseInt(PoP[12].elementValue[0].value) + parseInt(PoP[13].elementValue[0].value)) / 2 || 0,
                                Wx: Wx[13].elementValue[0].value,
                                WxCode: Wx[13].elementValue[1].value,
                                MaxT: (parseInt(MaxT[12].elementValue[0].value) + parseInt(MaxT[13].elementValue[0].value)) / 2,
                                MinT: (parseInt(MinT[12].elementValue[0].value) + parseInt(MinT[13].elementValue[0].value)) / 2,
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
                    setCurrentWeather((prevState) => ({
                        ...prevState,
                        observationTime: locationData.time.obsTime,
                        locationName: locationData.locationName,
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

    const getWeatherElement = () => {
        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-946AA758-015A-4355-9AB4-040115765F90&locationName=%E8%87%BA%E4%B8%AD%E5%B8%82";
        fetch(
            url
        )
            .then(
                res => res.json()
            )
            .then(
                (data) => {
                    const locationData = data.records.location[0].weatherElement;
                    const weatherElements = locationData.reduce(
                        (element, item) => {
                            if (["Wx", "PoP", "CI"].includes(item.elementName)) {
                                element[item.elementName] = item.time[0].parameter;
                            }
                            return element;

                        }, {})

                    setCurrentWeather((prevState) => ({
                        ...prevState,
                        Wx: weatherElements.Wx.parameterName,
                        weatherCode: weatherElements.Wx.parameterValue,
                        PoP: weatherElements.PoP.parameterName,
                        CI: weatherElements.CI.parameterName
                    }));
                }
            )
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
                            <WeatherIcon currentWeatherCode={currentWeather.weatherCode} moment="moon" />
                            {Math.round(currentWeather.temperature)}°
                        </Temperature>
                        <ElementDiv>
                            <ElementSpan>
                                {currentWeather.Wx}
                            </ElementSpan>
                            <ElementSpan>
                                {currentWeather.CI}
                            </ElementSpan>
                            <MaxMinTemperature>
                                {Math.round(currentWeather.maxTemperature)}°/{Math.round(currentWeather.minTemperature)}°
                            </MaxMinTemperature>
                        </ElementDiv>
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
                <WeekCard>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={0}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <WeekUl>
                            {nextWeekWeather.future.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <WeekElement>
                                        <Span style={{ textAlign: "center" }}>
                                            {new Intl.DateTimeFormat("zh-TW", {
                                                weekday: "long",
                                            }).format(item.week)}
                                        </Span>
                                        <img src={PopIcon} alt="降雨機率" />{Math.round(item.PoP)}%
                                        <span>{item.Wx}{item.WxCode}</span>
                                        <span>{Math.round(item.MaxT)}°/{Math.round(item.MinT)}°</span>
                                        <img src={UvIcon} alt="紫外線指數" />紫外線指數 {Math.round(item.UVI)}
                                    </WeekElement>
                                </SwiperSlide>
                            ))}

                        </WeekUl>
                    </Swiper>
                </WeekCard>
            </WeatherDiv>
        </Container>
    )
};

export default Weather;