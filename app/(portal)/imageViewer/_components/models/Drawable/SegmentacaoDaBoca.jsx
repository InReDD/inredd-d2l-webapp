"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Graphics, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js'
import transformCoordinates from '../utils/coordinates';
import { useViewer } from 'contexts/ViewerContext';

export default function SegmentacaoDaBoca({initialState }) {
    const initialStateCache = useRef(initialState)
    const [state, setState] = useState(initialState)
    const {canvasState} = useViewer()

    useEffect(() => {
        const [x1_o, y1_o, x2_o, y2_o] = initialStateCache.current;
        const [x1, y1] = transformCoordinates(x1_o, y1_o, canvasState);
        const [x2, y2] = transformCoordinates(x2_o, y2_o, canvasState);
        setState([x1, y1, x2, y2])
    }, [canvasState]);

    const [x1, y1, x2, y2] = state;

    // Lógica de desenho usando PIXI's Graphics
    const drawGraphics = () => {
        g.clear();
        g.lineStyle(1, 0xffd900, 0.6);
        g.moveTo(x1, y1);
        g.lineTo(x2, y1);
        g.lineTo(x2, y2);
        g.lineTo(x1, y2);
        g.lineTo(x1, y1);
        g.closePath();
    };

    // Estilo do texto
    const textStyle = new TextStyle({
        align: "center",
        fontFamily: "sans-serif",
        fontSize: 14,
        fontWeight: "bold",
        fill: "white",
    });

    return (
        <>
            <Graphics draw={drawGraphics} zIndex={1} />
        </>
    );
}