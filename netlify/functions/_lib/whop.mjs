export function whopRuntimeConfig() {
  const environment = process.env.WHOP_ENVIRONMENT === 'production' ? 'production' : 'sandbox'
  const sandbox = environment === 'sandbox'
  return {
    environment,
    baseUrl: sandbox ? 'https://sandbox-api.whop.com/api/v1' : undefined,
    apiKey: sandbox ? process.env.WHOP_SANDBOX_API_KEY : process.env.WHOP_API_KEY,
    accountId: sandbox ? process.env.WHOP_SANDBOX_ACCOUNT_ID : process.env.WHOP_ACCOUNT_ID,
    productId: sandbox ? process.env.WHOP_SANDBOX_PRODUCT_ID : process.env.WHOP_PRODUCT_ID,
    webhookSecret: sandbox ? process.env.WHOP_SANDBOX_WEBHOOK_SECRET : process.env.WHOP_WEBHOOK_SECRET,
  }
}

export function whopClientOptions(config) {
  return {
    token: config.apiKey,
    timeoutInSeconds: 12,
    maxRetries: 1,
    ...(config.baseUrl ? { baseUrl: config.baseUrl } : {}),
  }
}
