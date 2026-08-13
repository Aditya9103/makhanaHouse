import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ExportHero from '../components/export/ExportHero';
import ExportFeaturesBanner from '../components/export/ExportFeaturesBanner';
import ExportWhyChoose from '../components/export/ExportWhyChoose';
import ExportProducts from '../components/export/ExportProducts';
import ExportServices from '../components/export/ExportServices';
import ExportPackaging from '../components/export/ExportPackaging';
import ExportCertifications from '../components/export/ExportCertifications';
import ExportProcess from '../components/export/ExportProcess';
import ExportInquiryForm from '../components/export/ExportInquiryForm';
import ExportWorkflow from '../components/export/ExportWorkflow';

export default function Export() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="w-full">
            <ExportHero />
            <ExportFeaturesBanner />
            <ExportWhyChoose />
            <ExportProducts />
            <ExportServices />
            <ExportPackaging />
            <ExportCertifications />
            <ExportProcess />
            <ExportInquiryForm />
            <ExportWorkflow />
        </div>
    );
}
