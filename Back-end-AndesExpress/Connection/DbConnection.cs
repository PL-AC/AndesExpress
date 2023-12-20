

namespace Connection
{
    public class DbConnection
    {
        private String _connectionString = string.Empty;
        public DbConnection() {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).
                    AddJsonFile("appsettings.json").Build();
        }
    }
}