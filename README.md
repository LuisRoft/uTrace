# uTrace - Aplicación para rastrear tus emociones

uTrace es una aplicación móvil desarrollada con React Native que te permite rastrear y gestionar tus emociones diarias, así como tus actividades. También cuenta con una función de informes para visualizar tu progreso emocional.

## Características

- **Registro de emociones:** Registra tus emociones diarias con una interfaz intuitiva.
- **Gestión de actividades:** Agrega y rastrea tus actividades diarias.
- **Informes de emociones:** Visualiza tus emociones en un informe detallado con gráficos y estadísticas.
- **Recordatorios:** Configura recordatorios para registrar tus emociones y actividades.

## Requisitos

- Node.js (versión 12 o superior)
- Expo CLI

## Instalacion

1. Instala las dependencias

   ```bash
   npm install
   ```

2. Inicia la app

   ```bash
    npx expo start
   ```

En consola podras encontrar opciones para iniciar al app en:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Estructura del proyecto
```
uTrace/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   └── ...
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── register.tsx
│   └── ...
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── components/
│   ├── __test__/
│   ├── InputForm/
│   └── ...
├── constants/
├── hooks/
└── ...
```

## Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu nueva función: git checkout -b nueva-funcion
3. Realiza tus cambios y haz commit: git commit -m 'Agrega nueva funcion'
4. Haz push a la rama: git push origin nueva-funcion
5. Abre un Pull Request en este repositorio.