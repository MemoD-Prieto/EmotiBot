import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation();

    return (
        <div className="p-8 space-y-8 max-w-8xl mx-auto">
            <section className="text-center">
                <h1 className="text-4xl font-bold text-primary">🌟 {t('welcome_title')}</h1>
                <p className="text-lg text-gray-600 dark:text-white mt-3">{t('welcome_description')}</p>
            </section>

            <div className="grid md:grid-cols-3 gap-4">
                <section className="bg-white dark:bg-dark shadow-3xl rounded-2xl p-6 col-span-2">
                    <h2 className="text-2xl font-semibold text-primary">🚀 {t('mission_title')}</h2>
                    <p className="text-gray-700 dark:text-white mt-3 text-base">{t('mission_description')}</p>
                </section>

                <section className="bg-white dark:bg-dark shadow-3xl rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-primary">🧠 {t('why_title')}</h2>
                    <p className="text-gray-700 dark:text-white mt-3 text-base">{t('why_description')}</p>
                </section>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <section className="bg-white dark:bg-dark shadow-3xl rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-secondary">📄 {t('phq_title')}</h2>
                    <p className="text-gray-700 dark:text-white mt-3 text-base">{t('phq_description')}</p>
                </section>

                <section className="bg-white dark:bg-dark shadow-3xl rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-secondary">📄 {t('gad_title')}</h2>
                    <p className="text-gray-700 dark:text-white mt-3 text-base">{t('gad_description')}</p>
                </section>
            </div>

            <section className="bg-white dark:bg-dark shadow-3xl rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-success">🤖 {t('how_title')}</h2>
                <p className="text-gray-700 dark:text-white mt-3 text-base">{t('how_description')}</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-white text-base mt-2">
                    <li>📷 {t('how_point_1')}</li>
                    <li>🧾 {t('how_point_2')}</li>
                </ul>
                <p className="text-gray-700 dark:text-white mt-3 text-base">{t('how_extra')}</p>
            </section>

            <footer className="mt-12 text-center text-sm text-gray-500 dark:text-white-dark">
                <p>📘 {t('footer_disclaimer')}</p>
                <p className="mt-1">
                    &copy; {new Date().getFullYear()} EmotiBot. {t('footer_rights')}
                </p>
            </footer>
        </div>
    );
};

export default Index;
