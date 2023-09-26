export const getRequiredEnvVar = (envVarName: string): string => {
  const envVar = process.env[envVarName];
  if (envVar === undefined) {
    throw new Error(`Environment variable ${envVarName} is required`);
  }
  return envVar;
};
