import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Area, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, ComposedChart, Legend } from "recharts";
import { convertTimestampToLocalTime, formatNumber } from "../../../utils/utils";


export default function InfoChart() {
    const [data, setData] = useState([]);
    const [averageMA, setAverageMA] = useState({ ma5: 0, ma10: 0, ma20: 0 });
    const CustomLegend = () => {
        return (
            <Box>
                <p>MA5 : {averageMA.ma5.toFixed(2)}</p>
                <p>MA10 : {averageMA.ma10.toFixed(2)}</p>
                <p>MA20 : {averageMA.ma20.toFixed(2)}</p>
            </Box>
        );
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const API = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=24';
                const API = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=60';
                const response = await axios.get(API);

                let data = response.data.Data.Data;
                data = data.map((item) => {
                    return {
                        time: convertTimestampToLocalTime(item.time),
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                    };
                });
                // Calculate moving averages
                const dataWithMA = data.map((item, index, array) => {
                    const closePrices = array.slice(Math.max(index - 19, 0), index + 1).map(i => i.close);
                    const ma5 = closePrices.slice(-5).reduce((a, b) => a + b, 0) / Math.min(5, closePrices.length);
                    const ma10 = closePrices.slice(-10).reduce((a, b) => a + b, 0) / Math.min(10, closePrices.length);
                    const ma20 = closePrices.slice(-20).reduce((a, b) => a + b, 0) / Math.min(20, closePrices.length);
                    return { ...item, ma5, ma10, ma20 };
                });
                // Calculate the average values for MA5, MA10, MA20
                const sumMA5 = dataWithMA.reduce((acc, cur) => acc + (cur.ma5 || 0), 0);
                const sumMA10 = dataWithMA.reduce((acc, cur) => acc + (cur.ma10 || 0), 0);
                const sumMA20 = dataWithMA.reduce((acc, cur) => acc + (cur.ma20 || 0), 0);
                const avgMA5 = sumMA5 / dataWithMA.length;
                const avgMA10 = sumMA10 / dataWithMA.length;
                const avgMA20 = sumMA20 / dataWithMA.length;

                setAverageMA({ ma5: avgMA5, ma10: avgMA10, ma20: avgMA20 });
                setData(dataWithMA);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{ background: 'white' }} pb={3}>
            <Box sx={{ width: '90%', maxWidth: '100%', '@media (max-width: 600px)': { width: '100%' } }}>
                <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="6 6" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[(dataMin) => dataMin - 50, 'dataMax']} orientation="right" tickFormatter={formatNumber} />
                        <Tooltip />
                        <Legend verticalAlign="top" align="left"/>
                        {/* <Line type="monotone" dataKey="open" stroke="#8884d8" strokeWidth={2} dot={false} />
                        <Area type="monotone" dataKey="close" stroke="#82ca9d" fill="#c0ca33" />
                        <Line type="monotone" dataKey="high" stroke="#8884d8" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="low" stroke="#5084d8" strokeWidth={2} dot={false} /> */}

                        <Area type="monotone" dataKey="close" fill="#c0ca33" name="Closing Price" />
                        <Line type="monotone" dataKey="ma5" stroke="#82ca9d" name="MA5" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="ma10" stroke="#ffc658" name="MA10" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="ma20" stroke="#ff7300" name="MA20" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}