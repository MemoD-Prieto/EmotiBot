import { useState } from 'react';

const questions = {
    gad7: [
        '¿Te has sentido nervioso, ansioso o al límite?',
        '¿Te has sentido incapaz de parar de preocuparte?',
        '¿Te has preocupado demasiado por diferentes cosas?',
        '¿Has tenido dificultad para relajarte?',
        '¿Te has sentido tan inquieto que no puedes estar quieto?',
        '¿Te has irritado o molestado con facilidad?',
        '¿Has sentido miedo como si algo terrible pudiera pasar?',
    ],
    phq9: [
        '¿Has tenido poco interés o placer en hacer cosas?',
        '¿Te has sentido decaído, deprimido o sin esperanza?',
        '¿Has tenido problemas para dormir o has dormido demasiado?',
        '¿Te has sentido cansado o con poca energía?',
        '¿Has tenido poco apetito o has comido en exceso?',
        '¿Te has sentido mal contigo mismo o que has fallado?',
        '¿Has tenido dificultad para concentrarte?',
        '¿Te has movido o hablado tan despacio que otros lo notan o, por el contrario, te has sentido inquieto o agitado?',
        '¿Has pensado que estarías mejor muerto o de hacerte daño de alguna manera?',
    ],
};

const options = [
    { label: 'Nunca', value: 0 },
    { label: 'Varios días', value: 1 },
    { label: 'Más de la mitad de los días', value: 2 },
    { label: 'Casi todos los días', value: 3 },
];

const interpretScore = (score: number) => {
    if (score <= 4) return 'Sin síntomas';
    if (score <= 9) return 'Leve';
    if (score <= 14) return 'Moderado';
    return 'Severo';
};

const MentalHealthForms = () => {
    const [step, setStep] = useState(0);
    const [gadAnswers, setGadAnswers] = useState<number[]>(Array(7).fill(-1));
    const [phqAnswers, setPhqAnswers] = useState<number[]>(Array(9).fill(-1));

    const handleOptionChange = (index: number, value: number, type: 'gad' | 'phq') => {
        const update = type === 'gad' ? [...gadAnswers] : [...phqAnswers];
        update[index] = value;
        type === 'gad' ? setGadAnswers(update) : setPhqAnswers(update);
    };

    const handleSubmit = () => {
        const gadTotal = gadAnswers.reduce((a, b) => a + b, 0);
        const phqTotal = phqAnswers.reduce((a, b) => a + b, 0);
        const gadLevel = interpretScore(gadTotal);
        const phqLevel = interpretScore(phqTotal);
        alert(`Resultado GAD-7: ${gadTotal} (${gadLevel})\nResultado PHQ-9: ${phqTotal} (${phqLevel})`);
        // Reset for simulation
        setStep(0);
        setGadAnswers(Array(7).fill(-1));
        setPhqAnswers(Array(9).fill(-1));
    };

    const renderForm = (questionsList: string[], answers: number[], type: 'gad' | 'phq') => (
        <div className="space-y-6">
            {questionsList.map((q, i) => (
                <div key={i}>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">{q}</p>
                    <div className="flex flex-col sm:flex-row sm:gap-4 gap-2">
                        {options.map((opt) => (
                            <label key={opt.value} className="flex items-center gap-2 dark:text-white text-gray-800">
                                <input type="radio" name={`${type}-${i}`} value={opt.value} checked={answers[i] === opt.value} onChange={() => handleOptionChange(i, opt.value, type)} />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-6 sm:p-8">
            <div className="bg-white dark:bg-dark rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-primary mb-4 text-center dark:text-white">Evaluación de Salud Mental</h1>
                <p className="text-gray-700 dark:text-white text-center mb-6">Contesta estas preguntas con honestidad. Nos ayudará a saber cómo te sientes últimamente.</p>

                {step === 0 && renderForm(questions.gad7, gadAnswers, 'gad')}
                {step === 1 && renderForm(questions.phq9, phqAnswers, 'phq')}

                <div className="flex justify-between mt-8">
                    {step > 0 && (
                        <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                            Anterior
                        </button>
                    )}
                    {step < 1 ? (
                        <button className="btn btn-primary ml-auto" onClick={() => setStep(step + 1)}>
                            Siguiente
                        </button>
                    ) : (
                        <button className="btn btn-success ml-auto" onClick={handleSubmit}>
                            Enviar respuestas
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MentalHealthForms;
