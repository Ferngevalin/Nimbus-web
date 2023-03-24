import { useEffect, useState, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapRef } from "react-map-gl";
import polyline from "@mapbox/polyline";
import React from "react";

import { getPlanTabDispatch } from "@/components/PlanTab/PlanTabContext";

interface reviewDataType {
    placeTitle: string;
    address: string;
    placeDescription: string;
}

const useMap = () => {
    // Interface data and functions
    const [openFullTab, setOpenFullTab] = useState(false);
    const [closed, setClosed] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [reviewData, setReviewData] = useState({} as reviewDataType);
    const [run, setRun] = useState(true);
    const [openAlternatives, setOpenAlternative] = useState(false);
    const [fullPlan, setFullPlan] = useState({} as any);
    const dispatch: any = getPlanTabDispatch();
    const toggleOpenReview = (reviewData?: reviewDataType) => {
        console.log(reviewData);

        if (reviewData?.placeTitle) {
            setOpenReview(true);
            setReviewData(reviewData);
        } else {
            setOpenReview(false);
        }
    };

    const openTab = () => {
        setOpenFullTab(true);
        setClosed(false);
        setOpenAlternative(false);
        setOpenReview(false);
    };

    const closeFullTab = () => {
        setOpenFullTab(false);
        setClosed(true);
    };

    const toggleOpenAlternative = () => {
        setOpenAlternative(!openAlternatives);
    };

    // Map data and functions

    const [points, setPoints] = useState([] as any);

    const mapRef = React.useRef<MapRef>();
    const [route, setRoute] = useState([] as Array<number[]>);

    const onSelect = useCallback((longitude: number, latitude: number) => {
        mapRef.current?.flyTo({
            center: [longitude, latitude],
            duration: 1000,
        });
    }, []);

    const togglePinState = (changeIndex: number) => {
        pinState.forEach((_, index) => {
            if (index === changeIndex) {
                pinState[changeIndex] = "#45D8D0";
            } else {
                pinState[index] = "#000";
            }
        });

        setPinState([...pinState]);
    };

    useEffect(() => {
        //     const fetchRoute = async () => {
        //         const res = await fetch(`http://localhost:3000/api/getRoute`);
        //         const coordinates = await res.json();
        //         return coordinates;
        //     };
        //     const routeArrs: any = [];
        //     if (run) {
        //         fetchRoute().then((route) => {
        //             const decoded = polyline.decode(route);
        //             decoded.forEach((arr) => {
        //                 routeArrs.push(arr.reverse());
        //             });
        //             setRoute(routeArrs);
        //             setRun(false);
        //         });
        //         // const decoded = polyline.decode(
        //         //     "ueqoIgjwwJpk@a_CbaJinDveHngJplAvr`@vkA`cNr`Er|Jtr@dyZifFhpSboCzf[bbFx{c@zfErrt@{zDtpuAm{Blsc@gjI`nb@}oFtzG{lCfrTwbHg`@brApoNsSh`TxnCzeZpuK`pYpbH~zVxaLfaThiIp|g@iw@~xf@mYnkTxuBlzMyjFl~YuxFze[umFhfRhSv_JwfDjd[{kAhtFhn@veI`yHluc@ppElwEnoD~{SbtJpujApdFjbcAdoH`nq@t}Nny^j\\pfn@{_C`dRnw@vnKmbCs{@mlHutFcsI`aBg{F~fGq}GjsA}{ChfOg}Ad`GekFvLmgEnqKmhIffLawGnsd@wkI|sPmdKhwJgsZfh`@orJjpTa_EzpIauBzsN{`Dbp]`jC`|TpbBdqTesCfqWa}@`ru@k}Jxz|@ugBvrSk{H`|g@qtKr_RwvFxjZjlJdhe@z{@ztUkjCzv[k~Az_MpPzzIupCtwF|wBziOseArnH_lLzqGa_E`uL{mDnzYleCrm[dtGvoTh`Hxip@dxGljV_\\j`Vb_Alhb@txAzua@w{F~oo@w~BfmbAxoD|{b@jeCbr_@ggClvTe_@xqT}iCdnTwaExbk@kaL`oOalHaMsmErfMo|EhiSjDrrP`|@ty_@t`InnInaLtnAnfFd}GdaEdyNsV`pVay@n{o@imF~y[uyBdmGojBf{RtwAli|@cmCveY{pFbyQooKlbPmvRffTm_FvmDkxDxaYc{CzgSjjFvaTl{Dlwi@_wA~jj@nb@dsc@fqAhlKd|FvyLimBny[yjE~rNyBxk{@c_@das@oo@vb\\lxFlbj@h|Anqu@kDnzOs{CrmFgnAdmXmuJ`i^wnCvyIro@fvMpqBbrFtiCfQlBh~CqfDlmNsiBjtSaiDrz_@oqHdFauItlFq|IxsDgA~}EvaBjqiAnrAf`x@~vKrnl@rjH`wXm]|e]utFxta@olBzl\\esAvpSva@dvl@xoBnfoApsAlcw@jZfqXxrJ|kLtgEtbSlFlq^x_Greq@{nAzhd@bvKfym@|cIndu@~}Cvzr@hlEn~~@nkHtjh@iShly@cwLh{DqgDhiZy|I|iTatN~sv@ceJtfb@o`Hlir@dhAbx\\xdMnu[`uAxrJohDdaNmbCtuUmeEhzXi`Lp~UmoLjrQ{~MzdN{}d@n_SisO~dXqrH|_Qq|AyiAchIvpi@iv@rq\\iqHpsR{xGjkCsjCph[snFl}Vg_C~`FmhNfyn@orOv|d@}pT`uXoiIj~UyzL|yTc`AcwJ"
        //         // );
        //     }
        const fetchTrip = async () => {
            const res = await fetch(`http://localhost:3000/api/getTrip`);
            const plan = await res.json();
            return plan;
        };
        fetchTrip().then((trip) => {
            dispatch({
                type: "SET_FULL_PLAN",
                payload: trip,
            });
            const tempPoints: any[] = [];
            trip.forEach((day: any) => {
                const temp: any = [];
                day.forEach((point: any) => {
                    temp.push(point.coordinate);
                });
                if (tempPoints.length < trip.length) {
                    tempPoints.push(temp);
                }
            });
            setPoints(tempPoints);
            console.log(tempPoints);
        });
    }, []);

    const initialPinState: Array<string> = [];
    const [pinState, setPinState] = useState(initialPinState);

    Object.keys(points).forEach(() => {
        initialPinState.push("#000");
    });

    // fullPlan?.forEach((day: any, index: any) => {
    //     day.forEach((point: any) => {
    //         points[index].push(point.coordinate);
    //     });
    // });
    const geojson: any = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [...route],
                },
            },
        ],
    };

    const layerStyle: any = {
        id: "point",
        type: "line",
        paint: {
            "line-color": "#15cc09",
            "line-width": 3,
        },
    };

    return {
        mapRef,
        points,
        togglePinState,
        onSelect,
        geojson,
        layerStyle,
        pinState,
        openTab,
        closeFullTab,
        closed,
        openFullTab,
        toggleOpenReview,
        openReview,
        reviewData,
        toggleOpenAlternative,
        openAlternatives,
        fullPlan,
    };
};
export default useMap;
