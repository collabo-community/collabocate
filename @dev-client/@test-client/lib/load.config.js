
const loadClientAppConfig = async () => {
    const response = await fetch('../config.generated.json');
    const data = await response.json();
    return data;
}

const config = await loadClientAppConfig();
export default config;