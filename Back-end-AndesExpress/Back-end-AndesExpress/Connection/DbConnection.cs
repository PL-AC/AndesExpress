namespace Back_end_AndesExpress.Connection
{
    public class DbConnection
    {
        private String _connectionString = string.Empty;
        public DbConnection()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).
                    AddJsonFile("appsettings.json").Build();
            _connectionString = builder.GetSection("ConnectionStrings:connectionSql").Value;
        }
        public string connectionSql() 
        { 
            return _connectionString;
        }
    }
}
