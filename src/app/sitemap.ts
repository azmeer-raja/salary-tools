import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://salarytools.in';

    const calculators = [
        '',
        '/in-hand-salary-calculator',
        '/income-tax-calculator',
        '/emi-calculator',
        '/pf-calculator',
        '/hra-calculator',
        '/salary-hike-calculator',
        '/sip-calculator',
        '/compound-interest-calculator',
        '/bmi-calculator',
        '/calorie-calculator',
        '/bmr-calculator',
        '/age-calculator',
        '/date-calculator',
        '/percentage-calculator',
        '/discount-calculator',
        '/vat-calculator',
        '/tip-calculator',
        '/json-formatter',
        '/uuid-generator',
        '/timestamp-converter',
        '/mortgage-calculator',
        '/water-intake-calculator',
        '/password-generator',
        '/final-exam-calculator',
        '/pregnancy-calculator',
        '/inflation-calculator',
        '/love-calculator',
        '/random-number-generator',
        '/career-tools/notice-period-calculator',
        '/career-tools/promotion-salary-estimator',
        '/career-tools/freelancer-income-calculator',
        '/career-tools/hourly-rate-calculator',
        '/career-tools/cost-of-living-calculator',
        '/career-tools/annual-salary-calculator',
    ];

    const blogPosts = [
        '/blog',
        '/blog/top-high-paying-jobs-india',
        '/blog/software-engineer-salary-india',
        '/blog/how-to-negotiate-salary',
        '/blog/best-careers-after-computer-science',
        '/blog/future-tech-careers-2030',
    ];

    const staticPages = [
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        '/disclaimer',
    ];

    const allRoutes = [...calculators, ...blogPosts, ...staticPages];

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
