class Config{
    
}

class DevConfig extends Config{
    public adminUrl = "http://localhost:8080/admin/";
    public companyUrl = "http://localhost:8080/company/";
    public customerUrl = "http://localhost:8080/customer/";
    public homeUrl = "http://localhost:8080/home/";
    public loginUrl = "http://localhost:8080/auth/login/";
}

class TestingConfig extends Config{
    public adminUrl = "http://localhost:3030/admin/";
    public companyUrl = "http://localhost:3030/company/";
    public customerUrl = "http://localhost:3030/customer/";
    public homeUrl = "http://localhost:3030/home/";
    public loginUrl = "http://localhost:3030/auth/login/";
}

class ProductionConfig extends Config{
    public adminUrl = "http://localhost:8080/admin/";
    public companyUrl = "http://localhost:8080/company/";
    public customerUrl = "http://localhost:8080/customer/";
    public homeUrl = "http://localhost:8080/home/";
    public loginUrl = "http://localhost:8080/auth/login/";
}

const appConfig = process.env.NODE_ENV === "development" ? new DevConfig() : 
    process.env.NODE_ENV === "test" ? new TestingConfig() : new ProductionConfig();

export default appConfig; 