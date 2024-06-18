import CaraFeliz from "./icons/caraFeliz";
import CaraTriste from "./icons/caraTriste";
import CaraEnojado from "./icons/caraEnojado";
import CaraMiedo from "./icons/caraMiedo";
import CaraAsco from "./icons/caraAsco";
import CaraNose from "./icons/caraNose";

export type Emotions = {
    image : React.ComponentType<any>;
    buttons : string[][];
    backgroundColor : string;
    containerBackgroundColor : string;
};

export const emotions: Emotions[] = [
    {
        image: CaraFeliz,
        buttons: [
            ["Muy feliz", "Feliz", "Contento"],
            ["Muy feliz", "Feliz", "Contento"],
            ["Muy feliz", "Feliz", "Contento"],
        ],
        backgroundColor: "#F9F4E2",
        containerBackgroundColor: "#FFD700"
    },
    {
        image: CaraTriste,
        buttons: [
            ["Muy triste", "Triste", "Deprimido"],
            ["Muy triste", "Triste", "Deprimido"],
            ["Muy triste", "Triste", "Deprimido"],
        ],
        backgroundColor: '#D3D3D3',
        containerBackgroundColor: '#FF6347'
    },
    {
        image: CaraEnojado,
        buttons: [
            ["Muy enojado", "Enojado", "Irritado"],
            ["Muy enojado", "Enojado", "Irritado"],
            ["Muy enojado", "Enojado", "Irritado"],
        ],
        backgroundColor: '#FF6347',
        containerBackgroundColor: '#FF6347'
    },
    {
        image: CaraMiedo,
        buttons: [
            ["Muy asustado", "Asustado", "Nervioso"],
            ["Muy asustado", "Asustado", "Nervioso"],
            ["Muy asustado", "Asustado", "Nervioso"],
        ],
        backgroundColor: '#FF6347',
        containerBackgroundColor: '#FF6347'
    },
    {
        image: CaraAsco,
        buttons: [
            ["Muy asqueado", "Asqueado", "Repulsión"],
            ["Muy asqueado", "Asqueado", "Repulsión"],
            ["Muy asqueado", "Asqueado", "Repulsión"],
        ],
        backgroundColor: '#FF6347',
        containerBackgroundColor: '#FF6347'
    },
    {
        image: CaraNose,
        buttons: [
            ["Muy indiferente", "Indiferente", "Neutro"],
            ["Muy indiferente", "Indiferente", "Neutro"],
            ["Muy indiferente", "Indiferente", "Neutro"],
        ],
        backgroundColor: '#FF6347',
        containerBackgroundColor: '#FF6347'
    },
];
