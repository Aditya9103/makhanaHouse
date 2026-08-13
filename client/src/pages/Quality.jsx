import QualityHero from '../components/quality/QualityHero';
import QualityCertifications from '../components/quality/QualityCertifications';
import AboutProcess from '../components/about/AboutProcess';
import QualityCommitment from '../components/quality/QualityCommitment';

export default function Quality() {
    return (
        <div className="w-full">
            <QualityHero />
            <QualityCertifications />
            <AboutProcess />
            <QualityCommitment />
        </div>
    );
}
