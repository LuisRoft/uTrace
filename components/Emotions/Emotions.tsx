import FaceHappy from "../icons/FaceHappy";
import FaceSad from "../icons/FaceSad";
import FaceAngry from "../icons/FaceAngry";
import FaceScary from "../icons/FaceScary";
import FaceDisgust from "../icons/FaceDisgust";
import FaceNeutral from "../icons/FaceNeutral";
import { Emotions } from "@/types/EmotionsTypes";

export const emotions: Emotions[] = [
    {
        image: FaceHappy,
        buttons: [
            ["Orgulloso", "Feliz", "Provocativo"],
            ["Aceptado", "Inspirado", "Confiado"],
            ["Poderoso", "Jugueton", "Valiente"],
        ],
        backgroundColor: "#F9F4E2",
        containerBackgroundColor: "#FFCE5D"
    },
    {
        image: FaceSad,
        buttons: [
            ["Ansioso", "Aburrido", "Abrumado"],
            ["Vacio", "Desesperado", "Ignorado"],
            ["Deprimido", "Anhelante", "Inferior"],
        ],
        backgroundColor: '#8DAEEB',
        containerBackgroundColor: '#4B72FE'
    },
    {
        image: FaceAngry,
        buttons: [
            ["Distante", "Enfadado", "Hostil"],
            ["Odioso", "Agresivo", "Sospechoso"],
            ["Amenazado", "Celoso", "Inseguro"],
        ],
        backgroundColor: '#f9ac8c',
        containerBackgroundColor: '#FF7A5D'
    },
    {
        image: FaceScary,
        buttons: [
            ["Herido", "Sumiso", "Ridiculizado"],
            ["Humillado", "Inseguro", "Pobre"],
            ["Rechazado", "Asustado", "Aterrado"],
        ],
        backgroundColor: '#E7C1FE',
        containerBackgroundColor: '#8229b1'
    },
    {
        image: FaceDisgust,
        buttons: [
            ["Critico", "Terrible", "Sárcastico"],
            ["Desaprobado", "Evasivo", "Esceptico"],
            ["Decepcionado", "Culpable", "Repugnante"],
        ],
        backgroundColor: '#85E0A3',
        containerBackgroundColor: '#00FF66'
    },
    {
        image: FaceNeutral,
        buttons: [
            ["Muy indiferente", "Indiferente", "Neutro"],
            ["Muy indiferente", "Indiferente", "Neutro"],
            ["Muy indiferente", "Indiferente", "Neutro"],
        ],
        backgroundColor: '#EAFAFF',
        containerBackgroundColor: '#C3D7FF'
    },
];
