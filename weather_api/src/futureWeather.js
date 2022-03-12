import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import PopIcon from "./images/pop.svg";
import styled from "@emotion/styled";

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

const FutureWeather = () => {
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


    // 進入畫面即載入資料
    useEffect(() => {
        getNextWeekData();
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


                    setNextWeekWeather((prevState)=>({
                        ...prevState,
                        future: [
                            {
                                PoP: (parseInt(PoP[2].elementValue[0].value) + parseInt(PoP[3].elementValue[0].value))/2 || 0,
                                Wx: Wx[3].elementValue[0].value,
                                MaxT: (parseInt(MaxT[2].elementValue[0].value) + parseInt(MaxT[3].elementValue[0].value))/2,
                                MinT: (parseInt(MinT[2].elementValue[0].value) + parseInt(MinT[3].elementValue[0].value))/2,
                                UVI: UVI[1].elementValue[0].value
                            }
                            ,
                            {
                                PoP: (parseInt(PoP[4].elementValue[0].value) + parseInt(PoP[5].elementValue[0].value))/2 || 0,
                                Wx: Wx[5].elementValue[0].value,
                                MaxT: (parseInt(MaxT[4].elementValue[0].value) + parseInt(MaxT[5].elementValue[0].value))/2,
                                MinT: (parseInt(MinT[4].elementValue[0].value) + parseInt(MinT[5].elementValue[0].value))/2,
                                UVI: UVI[2].elementValue[0].value
                            }
                            ,
                            {
                                PoP: (parseInt(PoP[6].elementValue[0].value) + parseInt(PoP[7].elementValue[0].value))/2 || 0,
                                Wx: Wx[7].elementValue[0].value,
                                MaxT: (parseInt(MaxT[6].elementValue[0].value) + parseInt(MaxT[7].elementValue[0].value))/2,
                                MinT: (parseInt(MinT[6].elementValue[0].value) + parseInt(MinT[7].elementValue[0].value))/2,
                                UVI: UVI[3].elementValue[0].value
                            }
                            ,
                            {
                                PoP: (parseInt(PoP[8].elementValue[0].value) + parseInt(PoP[9].elementValue[0].value))/2 || 0,
                                Wx: Wx[9].elementValue[0].value,
                                MaxT: (parseInt(MaxT[8].elementValue[0].value) + parseInt(MaxT[9].elementValue[0].value))/2,
                                MinT: (parseInt(MinT[8].elementValue[0].value) + parseInt(MinT[9].elementValue[0].value))/2,
                                UVI: UVI[4].elementValue[0].value
                            }
                            ,
                            {
                                PoP: (parseInt(PoP[10].elementValue[0].value) + parseInt(PoP[11].elementValue[0].value))/2 || 0,
                                Wx: Wx[11].elementValue[0].value,
                                MaxT: (parseInt(MaxT[10].elementValue[0].value) + parseInt(MaxT[11].elementValue[0].value))/2,
                                MinT: (parseInt(MinT[10].elementValue[0].value) + parseInt(MinT[11].elementValue[0].value))/2,
                                UVI: UVI[5].elementValue[0].value
                            }
                            ,
                            {
                                PoP: (parseInt(PoP[12].elementValue[0].value) + parseInt(PoP[13].elementValue[0].value))/2 || 0,
                                Wx: Wx[13].elementValue[0].value,
                                MaxT: (parseInt(MaxT[12].elementValue[0].value) + parseInt(MaxT[13].elementValue[0].value))/2,
                                MinT: (parseInt(MinT[12].elementValue[0].value) + parseInt(MinT[13].elementValue[0].value))/2,
                                UVI: UVI[6].elementValue[0].value
                            }
                        ]
                    }))
                }
            )


    }

    return (
                <WeekCard>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={150}
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
                                        <span>{new Intl.DateTimeFormat("zh-TW", {
                                            weekday: "long",
                                        }).format(new Date(Date.now()))}</span>
                                        <img src={PopIcon} />{item.PoP}%
                                        <span>{item.Wx}</span>
                                        <span>{item.MaxT}°/{item.MinT}°</span>
                                    </WeekElement>
                                </SwiperSlide>
                            ))}

                        </WeekUl>
                    </Swiper>
                </WeekCard>
    )
};

export default FutureWeather;