import React from "react";
import { Modules } from "./Storage"
import { Spacer } from "./subcomponents/Spacer";

export const Main = () => {
    return (
        <div>
            <Spacer />
            <section id="Modules">
                <Modules />
            </section>
            <Spacer />
        </div>

    )
}