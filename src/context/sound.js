import { createContext, useContext, useState, useEffect } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // Load saved preference
    useEffect(() => {
        const save = localStorage.getItem('soundEnabled');
        if (save !== null) {
            setSoundEnabled(JSON.parse(save));
        }
        setIsMounted(true);
    }, []);

    // Save preference
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
        }
    }, [soundEnabled, isMounted]);

    const toggleSound = () => setSoundEnabled((prev) => !prev);

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export const useSoundContext = () => useContext(SoundContext);
