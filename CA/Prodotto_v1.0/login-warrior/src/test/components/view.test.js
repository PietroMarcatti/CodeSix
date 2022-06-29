import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./../../components/View";
import "@testing-library/jest-dom";

describe("Test - View", () => {
    beforeEach(()=>{
        render(<App />);
    });

    test("check render view", () => {
        const menu = document.getElementsByClassName("navbar");
        const content = document.getElementsByClassName("content");

        expect(menu[0]).toBeInTheDocument();
        expect(content[0]).toBeInTheDocument();
    });

    test("Open and close CSV modal", async() => {
        fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
        
        await waitFor(() => {			
            expect(screen.getByRole("button", { name: "Torna al menù" })).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button", { name: "Torna al menù" }));
    });

    test("Error message if the data aren't loaded", async() => {
        fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
        
        await waitFor(() => {			
            expect(screen.getByRole("button", { name: "Conferma selezione" })).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button",{name: "Conferma selezione" }));

        await waitFor(() => {	
            expect(screen.getByText("Avviso")).toBeInTheDocument();
        });
    });
});