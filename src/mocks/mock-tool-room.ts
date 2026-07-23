export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
}

export interface MachineryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface InfrastructureItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const toolRoomHeroContent = {
  label: 'Engineering Excellence',
  heading: 'Manufacturing Precision',
  description:
    'Advanced manufacturing solutions for global OEMs with a commitment to quality, accuracy and innovation.',
  secondaryDescription:
    "Titan OEM's in-house tool room brings together decades of precision engineering experience and state-of-the-art machinery, enabling us to design, build, and maintain the tooling behind every product we manufacture.",
};

export const capabilitiesContent = {
  heading: 'Our Capabilities',
  description: 'End-to-end expertise and commitment to deliver precision-engineered solutions.',
  items: [
    {
      id: 'manufacturing-services',
      title: 'Manufacturing Services',
      description:
        'Comprehensive manufacturing services delivering precision-engineered components for global brands.',
    },
    {
      id: 'engineering-expertise',
      title: 'Engineering Expertise',
      description:
        'Experienced engineering team specialized in designing and developing high-performance watch movements.',
    },
    {
      id: 'product-development',
      title: 'Product Development',
      description:
        'End-to-end product development from concept and design to prototyping and commercialization.',
    },
    {
      id: 'quality-standards',
      title: 'Quality Standards',
      description:
        'Strict quality control and testing at every stage to ensure reliability, accuracy and compliance.',
    },
  ] satisfies CapabilityItem[],
};

export const machineryContent = {
  heading: 'Our Machinery',
  description: 'State-of-the-art machines for unmatched precision and performance.',
  items: [
    {
      id: 'cnc-turning-center',
      title: 'CNC Turning Center',
      description: 'High precision turning for complex components with tight tolerances.',
      imageUrl: '/tool-room/machinery-1.jpg',
    },
    {
      id: 'cnc-vertical-machining-center',
      title: 'CNC Vertical Machining Center',
      description: 'Advanced 3-axis/4-axis machining for high precision and intricate components.',
      imageUrl: '/tool-room/machinery-2.jpg',
    },
    {
      id: 'surface-grinding-machine',
      title: 'Surface Grinding Machine',
      description: 'Precision surface grinding for flat surfaces with superior finish and accuracy.',
      imageUrl: '/tool-room/machinery-3.jpg',
    },
    {
      id: 'wire-edm-machine',
      title: 'Wire EDM Machine',
      description: 'Ideal for cutting complex profiles in hard materials with high accuracy.',
      imageUrl: '/tool-room/machinery-4.jpg',
    },
    {
      id: 'cmm',
      title: 'CMM (Coordinate Measuring Machine)',
      description: 'High-precision measurement and inspection for quality assurance.',
      imageUrl: '/tool-room/machinery-5.jpg',
    },
  ] satisfies MachineryItem[],
};

export const infrastructureContent = {
  heading: 'Our Infrastructure',
  description: 'World-class infrastructure to ensure quality, efficiency and timely delivery.',
  items: [
    {
      id: 'production-area',
      title: 'Production Area',
      description:
        'Advanced production area with modern machinery and streamlined workflow for maximum efficiency.',
      imageUrl: '/tool-room/infrastructure-1.jpg',
    },
    {
      id: 'assembly-area',
      title: 'Assembly Area',
      description:
        'Dedicated assembly lines with skilled workforce ensuring precision assembly and consistency.',
      imageUrl: '/tool-room/infrastructure-2.jpg',
    },
    {
      id: 'testing-facilities',
      title: 'Testing Facilities',
      description:
        'Fully equipped testing and inspection labs to ensure every product meets global quality standards.',
      imageUrl: '/tool-room/infrastructure-3.jpg',
    },
    {
      id: 'infrastructure-gallery',
      title: 'Infrastructure Gallery',
      description: 'A glimpse of our advanced facilities and world-class infrastructure.',
      imageUrl: '/tool-room/infrastructure-4.jpg',
    },
  ] satisfies InfrastructureItem[],
};
