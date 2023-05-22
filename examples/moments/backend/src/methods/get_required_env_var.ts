export const getRequiredEnvVar = (envVarName: string): string => {
  const env_var = process.env[envVarName];
  if (env_var === undefined) {
    throw new Error(`Environment variable ${envVarName} is required`);
  }
  return env_var;
};
