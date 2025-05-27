"use client";

import React, { useEffect, useRef, useState } from "react";
import { Graphics, Text, Container } from "@pixi/react";
import { TextStyle } from "pixi.js";
import transformCoordinates from "../utils/coordinates";
import { useViewer } from "contexts/ViewerContext";

const tooltipStyle = new TextStyle({
    align: "center",
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: "bold",
    stroke: "white",
});

export default function DeteccaoDaBoca({ initialState }) {
    const initialStateCache = useRef(initialState);
    const [state, setState] = useState(initialState);
    const {canvasState} = useViewer()

    useEffect(() => {
        const [x1_o, y1_o, x2_o, y2_o] = initialStateCache.current;
        const [x1, y1] = transformCoordinates(x1_o, y1_o, canvasState);
        const [x2, y2] = transformCoordinates(x2_o, y2_o, canvasState);
        setState([x1, y1, x2, y2]);
    }, [canvasState]);

    const [x1, y1, x2, y2] = state;

    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    const drawGraphics = () => {
        g.clear();
        g.lineStyle(2, 0xffd900, 1); // Thickness, color, alpha
        g.drawRect(x1, y1, width, height);
        g.endFill();
    };

    const labelX = x1 + width / 2; // Centraliza horizontalmente
    const labelY = y1 - 20 - 10; // Posiciona o texto acima do retângulo
    const balloonPadding = 10; // Espaço interno do balão

    const drawBalloon = () => {
        const textWidth = 160; // Largura estimada do texto
        const textHeight = 30; // Altura estimada do texto
        const balloonX = labelX - textWidth / 2;
        const balloonY = labelY - textHeight / 2;

        g.clear();
        g.beginFill("purple", 1); // Fundo preto com opacidade
        g.drawRoundedRect(
            balloonX - balloonPadding / 2,
            balloonY - balloonPadding / 2,
            textWidth + balloonPadding,
            textHeight + balloonPadding,
            10 // Raio dos cantos arredondados
        );
        g.endFill();
    };

    return (
        <>
            <Container zIndex={2}>
                {/* Balão */}
                <Graphics draw={drawBalloon} />
                {/* Texto */}
                <Text
                    x={labelX}
                    y={labelY}
                    text="Detecção da Boca"
                    anchor={{ x: 0.5, y: 0.5 }} // Centraliza o texto
                    style={tooltipStyle}
                />
            </Container>
            {/* Retângulo principal */}
            <Graphics draw={drawGraphics} zIndex={1} />
        </>
    );
}