import {
  CfnServerlessInstance,
  ServerlessInstanceProviderSettingsProviderName,
} from 'awscdk-resources-mongodbatlas';
import { Construct } from 'constructs';

interface AtlasDbProps {
  readonly projId: string;
  readonly stage: string;
  // readonly continuousBackupEnabled: string;
  // readonly terminationProtectionEnabled: string;
}

export class AtlasDb extends Construct {
  constructor(scope: Construct, id: string, props: AtlasDbProps) {
    super(scope, id);

    const { projId, stage } = props;

    new CfnServerlessInstance(this, 'MyServerlessInstance', {
      projectId: projId,
      profile: stage,
      // continuousBackupEnabled: atlasProps.continuousBackupEnabled,
      continuousBackupEnabled: false,
      providerSettings: {
        providerName: ServerlessInstanceProviderSettingsProviderName.SERVERLESS,
      },
      // terminationProtectionEnabled: atlasProps.terminationProtectionEnabled,
      terminationProtectionEnabled: false,
    });
  }
}
