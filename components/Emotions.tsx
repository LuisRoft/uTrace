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
            ["Orgulloso", "Feliz", "Provocativo"],
            ["Aceptado", "Inspirado", "Confiado"],
            ["Poderoso", "Jugeton", "Valiente"],
        ],
        backgroundColor: "#F9F4E2",
        containerBackgroundColor: "#FFCE5D"
    },
    {
        image: CaraTriste,
        buttons: [
            ["Ansioso", "Aburrido", "Abrumado"],
            ["Vacio", "Desesperado", "Ignorado"],
            ["Deprimido", "Anhelante", "Inferior"],
        ],
        backgroundColor: '#8DAEEB',
        containerBackgroundColor: '#4B72FE'
    },
    {
        image: CaraEnojado,
        buttons: [
            ["Distante", "Enfadado", "Hostil"],
            ["Odioso", "Agresivo", "Sospechoso"],
            ["Amenazado", "Celoso", "Inseguro"],
        ],
        backgroundColor: '#f9ac8c',
        containerBackgroundColor: '#FF7A5D'
    },
    {
        image: CaraMiedo,
        buttons: [
            ["Herido", "Sumiso", "Ridiculizado"],
            ["Humillado", "Inseguro", "Pobre"],
            ["Rechazado", "Asustado", "Aterrado"],
        ],
        backgroundColor: '#E7C1FE',
        containerBackgroundColor: '#8229b1'
    },
    {
        image: CaraAsco,
        buttons: [
            ["Critico", "Terrible", "Sárcastico"],
            ["Desaprobado", "Evasivo", "Esceptico"],
            ["Decepcionado", "Culpable", "Repugnante"],
        ],
        backgroundColor: '#85E0A3',
        containerBackgroundColor: '#00FF66'
    },
    {
        image: CaraNose,
        buttons: [
            ["Muy indiferente", "Indiferente", "Neutro"],
            ["Muy indiferente", "Indiferente", "Neutro"],
            ["Muy indiferente", "Indiferente", "Neutro"],
        ],
        backgroundColor: '#EAFAFF',
        containerBackgroundColor: '#C3D7FF'
    },
];
