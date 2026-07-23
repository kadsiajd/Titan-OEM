import { CapabilitiesSection } from '@/features/tool-room/components/CapabilitiesSection';
import { InfrastructureSection } from '@/features/tool-room/components/InfrastructureSection';
import { MachinerySection } from '@/features/tool-room/components/MachinerySection';
import { ToolRoomHero } from '@/features/tool-room/components/ToolRoomHero';
import { ToolRoomTabs } from '@/features/tool-room/components/ToolRoomTabs';

export default function ToolRoomPage() {
  return (
    <div>
      <ToolRoomHero />
      <ToolRoomTabs />
      <CapabilitiesSection />
      <MachinerySection />
      <InfrastructureSection />
    </div>
  );
}
