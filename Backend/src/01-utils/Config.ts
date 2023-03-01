
abstract class Config {
    public port: number = 3001;
}

class DevelopmentConfig extends Config {
    public mongoConnectionString = "mongodb://localhost:27017/Flights";
    public constructor() {
        super();
    }
}

const config = new DevelopmentConfig();

export default config;    
