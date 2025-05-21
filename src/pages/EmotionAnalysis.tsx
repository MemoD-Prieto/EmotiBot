import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const EmotionAnalysis = () => {
    const { t, i18n } = useTranslation();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [cameraOn, setCameraOn] = useState(false);
    const [emotion, setEmotion] = useState<string | null>(null);
    const [robotMode, setRobotMode] = useState(true);
    const [story, setStory] = useState<string | null>(null);

    const requestCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            setCameraOn(true);
        } catch {
            alert(t('emotion_analysis.permission_alert'));
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        setCameraOn(false);
        setEmotion(null);
        setStory(null);
    };

    const convertFrameToTensorInput = (): number[][][] | null => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        if (!video) return null;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const result: number[][][] = [];
        for (let y = 0; y < height; y++) {
            const row: number[][] = [];
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                row.push([data[i], data[i + 1], data[i + 2]]); // RGB
            }
            result.push(row);
        }

        return result;
    };

    const analyzeEmotion = () => {
        const imageData = convertFrameToTensorInput();
        if (imageData) {
            console.log('Simulated payload:', JSON.stringify({ image: imageData }));
        }

        const emotions = Object.keys(t('emotion_analysis.emotion', { returnObjects: true })) as string[];
        const selected = emotions[Math.floor(Math.random() * emotions.length)];
        setEmotion(selected);
        setStory(null);
    };

    const startStory = () => {
        if (!emotion) return;
        const storySet = t(`emotion_stories.${emotion}`, { returnObjects: true }) as string[];
        const chosen = storySet[Math.floor(Math.random() * storySet.length)];
        setStory(chosen);
        speakStory(chosen);
    };

    const speakStory = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = i18n.language === 'es' ? 'es-MX' : 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="p-8 space-y-6">
            <div className="bg-white dark:bg-dark shadow-2xl rounded-2xl p-6 max-w-4xl mx-auto relative">
                {/* Toggle Button */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                        onClick={() => setRobotMode((prev) => !prev)}
                        className={`w-10 h-10 rounded-full shadow transition-all duration-200 ${robotMode ? 'ring-2 ring-primary bg-primary/10' : 'bg-white'}`}
                        title={t(robotMode ? 'emotion_analysis.robot_mode_on' : 'emotion_analysis.robot_mode_off')}
                    >
                        <img src="/assets/images/logo.png" alt="Toggle View" className="rounded-full w-full h-full" />
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-primary mb-4 text-center">{t('emotion_analysis.title')}</h1>
                <p className="text-base text-gray-700 dark:text-white mb-4 text-center">{t('emotion_analysis.description')}</p>

                {!cameraOn && (
                    <div className="flex justify-center mb-4">
                        <img src="/assets/images/asking.png" alt="EmotiBot asking" className="h-36 w-auto object-contain" />
                    </div>
                )}

                {cameraOn && robotMode && (
                    <div className="flex justify-center mb-4">
                        <img src="/assets/images/analyze.png" alt="EmotiBot analyzing" className="h-36 w-auto object-contain" />
                    </div>
                )}

                <div className="flex flex-col items-center space-y-4">
                    <video ref={videoRef} className={`rounded-xl border w-full max-w-md ${!cameraOn || robotMode ? 'hidden' : ''}`} autoPlay muted />

                    <div className="flex space-x-4">
                        {!cameraOn ? (
                            <button className="btn btn-primary" onClick={requestCameraAccess}>
                                {t('emotion_analysis.turn_on_camera')}
                            </button>
                        ) : (
                            <>
                                <button className="btn btn-secondary" onClick={analyzeEmotion}>
                                    {t('emotion_analysis.analyze')}
                                </button>
                                <button className="btn btn-danger" onClick={stopCamera}>
                                    {t('emotion_analysis.turn_off_camera')}
                                </button>
                            </>
                        )}
                    </div>

                    {emotion && (
                        <>
                            <p className="text-lg text-success text-center">
                                {t('emotion_analysis.detected')} <strong>{t(`emotion_analysis.emotion.${emotion}`)}</strong>! 🌟
                            </p>
                            <button className="btn btn-accent" onClick={startStory}>
                                {t('emotion_analysis.start_story')}
                            </button>
                        </>
                    )}

                    {story && <p className="text-base text-gray-800 dark:text-white text-center max-w-md italic mt-2">{story}</p>}
                </div>
            </div>
        </div>
    );
};

export default EmotionAnalysis;
