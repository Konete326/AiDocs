const { parseTechStack } = require('./techStackParser');

const addNextScaffold = (folder, slug, title) => {
  folder.file('package.json', JSON.stringify({
    name: slug,
    version: '1.0.0',
    private: true,
    scripts: { dev: 'next dev', build: 'next build', start: 'next start', lint: 'next lint' },
    dependencies: { next: '^14.2.0', react: '^18.3.0', 'react-dom': '^18.3.0', 'lucide-react': '^0.350.0' }
  }, null, 2));
  folder.file('next.config.js', '/** @type {import("next").NextConfig} */\nconst nextConfig = { reactStrictMode: true };\nmodule.exports = nextConfig;\n');
  folder.file('jsconfig.json', JSON.stringify({ compilerOptions: { paths: { '@/*': ['./*'] } } }, null, 2));
  folder.file('.env.example', 'DATABASE_URL=\nNEXTAUTH_SECRET=\nNEXT_PUBLIC_API_URL=\n');
  const app = folder.folder('app');
  app.file('layout.jsx', `export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }\n`);
  app.file('page.jsx', `export default function Home() { return <main className="p-8"><h1>Welcome to ${title}</h1></main>; }\n`);
};

const addPythonScaffold = (folder, slug, title) => {
  folder.file('requirements.txt', 'fastapi>=0.110.0\nuvicorn[standard]>=0.28.0\npydantic>=2.6.0\npython-dotenv>=1.0.0\nsqlalchemy>=2.0.0\n');
  folder.file('main.py', `from fastapi import FastAPI\napp = FastAPI(title="${title}")\n@app.get("/")\ndef read_root():\n    return {"message": "Welcome to ${title} API"}\n`);
  folder.file('config.py', `from pydantic_settings import BaseSettings\nclass Settings(BaseSettings):\n    app_name: str = "${title}"\n    env: str = "development"\nsettings = Settings()\n`);
  folder.file('.env.example', 'DATABASE_URL=postgresql://user:pass@localhost:5432/dbname\nSECRET_KEY=change_me_in_production\n');
};

const addDotnetScaffold = (folder, slug, title) => {
  folder.file(`${slug}.csproj`, `<Project Sdk="Microsoft.NET.Sdk.Web">\n  <PropertyGroup>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n</Project>\n`);
  folder.file('Program.cs', `var builder = WebApplication.CreateBuilder(args);\nbuilder.Services.AddControllers();\nvar app = builder.Build();\napp.MapControllers();\napp.Run();\n`);
  folder.file('appsettings.json', JSON.stringify({ Logging: { LogLevel: { Default: 'Information' } }, ConnectionStrings: { DefaultConnection: `Server=localhost;Database=${slug};` } }, null, 2));
  folder.folder('Controllers').file('HealthController.cs', `using Microsoft.AspNetCore.Mvc;\nnamespace Api.Controllers {\n  [ApiController]\n  [Route("api/[controller]")]\n  public class HealthController : ControllerBase {\n    [HttpGet] public IActionResult Get() => Ok(new { status = "Healthy", project = "${title}" });\n  }\n}\n`);
};

const addLaravelScaffold = (folder, slug, title) => {
  folder.file('composer.json', JSON.stringify({ name: `clarifyai/${slug}`, type: 'project', require: { php: '^8.2', 'laravel/framework': '^11.0' } }, null, 2));
  folder.file('.env.example', `APP_NAME="${title}"\nAPP_ENV=local\nAPP_KEY=\nDB_CONNECTION=sqlite\n`);
  folder.file('artisan_setup.txt', '1. composer install\n2. php artisan key:generate\n3. php artisan migrate\n4. php artisan serve\n');
};

const addStackScaffold = (projectFolder, slug, projectTitle, wizardAnswers = {}) => {
  const stack = parseTechStack(wizardAnswers);
  if (stack.profile === 'nextjs_fullstack' || stack.profile === 'nextjs_decoupled') {
    addNextScaffold(projectFolder, slug, projectTitle);
  } else if (stack.profile === 'python_fastapi_django') {
    addPythonScaffold(projectFolder, slug, projectTitle);
  } else if (stack.profile === 'dotnet_csharp') {
    addDotnetScaffold(projectFolder, slug, projectTitle);
  } else if (stack.profile === 'php_laravel') {
    addLaravelScaffold(projectFolder, slug, projectTitle);
  } else {
    addNextScaffold(projectFolder, slug, projectTitle);
  }
};

module.exports = { addStackScaffold };
