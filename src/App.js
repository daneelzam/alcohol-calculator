import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [initialVolume, setInitialVolume] = useState('');
    const [initialStrength, setInitialStrength] = useState('');
    const [targetStrength, setTargetStrength] = useState('');
    const [calculatedVolume, setCalculatedVolume] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleQuickSet = (setter, value) => {
        setter(value);
    };

    const handleCalculate = () => {
        setIsError(false)
        const volume = parseFloat(initialVolume);
        const strength1 = parseFloat(initialStrength);
        const strength2 = parseFloat(targetStrength);

        if (
            isNaN(volume) ||
            isNaN(strength1) ||
            isNaN(strength2) ||
            volume <= 0 ||
            strength1 <= 0 ||
            strength2 <= 0 ||
            strength1 > 100 ||
            strength2 > 100
        ) {
            setIsError(true)
            return;
        }

        const result = (volume * strength1) / strength2;
        setCalculatedVolume(result.toFixed(2));
    };

    return (
        <div className="app">
            <h1>Алкоголемер</h1>

            <div className="input-group">
                <label htmlFor="volume">Объем, л:</label>
                <input
                    id="volume"
                    type="number"
                    value={initialVolume}
                    onChange={(e) => setInitialVolume(e.target.value)}
                    placeholder="Введите объем, например, 1"
                />
                <div className="quick-options">
                    <button onClick={() => handleQuickSet(setInitialVolume, 0.2)}>0.2</button>
                    <button onClick={() => handleQuickSet(setInitialVolume, 0.5)}>0.5</button>
                    <button onClick={() => handleQuickSet(setInitialVolume, 1)}>1</button>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="strength">Крепость, %:</label>
                <input
                    id="strength"
                    type="number"
                    value={initialStrength}
                    onChange={(e) => setInitialStrength(e.target.value)}
                    placeholder="Введите крепость, например, 40"
                />
                <div className="quick-options">
                    <button onClick={() => handleQuickSet(setInitialStrength, 40)}>Водка</button>
                    <button onClick={() => handleQuickSet(setInitialStrength, 5)}>Пиво</button>
                    <button onClick={() => handleQuickSet(setInitialStrength, 12)}>Вино</button>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="desired-strength">Желаемая крепость, %:</label>
                <input
                    id="desired-strength"
                    type="number"
                    value={targetStrength}
                    onChange={(e) => setTargetStrength(e.target.value)}
                    placeholder="Введите желаемую крепость"
                />
                <div className="quick-options">
                    <button onClick={() => handleQuickSet(setTargetStrength, 40)}>Водка</button>
                    <button onClick={() => handleQuickSet(setTargetStrength, 5)}>Пиво</button>
                    <button onClick={() => handleQuickSet(setTargetStrength, 12)}>Вино</button>
                </div>
            </div>

            <button onClick={handleCalculate}>Рассчитать</button>

            <div className="result">
                {isError ? (
                    <p className="error">Произошла ошибка при расчете. Пожалуйста, проверьте данные.</p>
                ) : calculatedVolume ? (
                    <>
                        <h2>Результат</h2>
                        <p>
                            {calculatedVolume} л жидкости с крепостью {targetStrength}%.
                        </p>
                    </>
                ) : (
                    <p>Введите данные для расчёта.</p>
                )}
            </div>
            <div id="joke" className="joke-of-the-day">
                <h2>Анекдот дня</h2>
                <iframe src="http://rzhunemogu.ru/Widzh/Anekdot2.aspx" frameBorder="0" title="joke"></iframe>
            </div>
        </div>
    );
};

export default App;
