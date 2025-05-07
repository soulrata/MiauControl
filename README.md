# MiauSound

## Descripción
MiauSound es una consola de sonidos felinos interactiva y responsiva. Esta aplicación web permite reproducir diferentes sonidos ambientales y felinos a través de una interfaz estilo pixel art inspirada en consolas retro. La aplicación incluye un visualizador de audio y una representación animada de un gato que cambia de estado de ánimo aleatoriamente.

## Características Principales
- Interfaz responsiva que se adapta a dispositivos móviles y de escritorio
- Control de volumen integrado
- 15 botones de sonido diferentes para reproducir diversos efectos sonoros
- Visualizador de frecuencias de audio en tiempo real
- Representación de un gato en pixel art con más de 8 estados emocionales diferentes
- Cambios aleatorios de expresión del gato cada 20-30 segundos
- Diseño retro con estética pixel art

## Requisitos
- Navegador web moderno (Chrome, Firefox, Safari)
- Conexión a Internet (opcional, solo para cargar la página inicial)

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/miausound.git
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd miausound
   ```
3. Agregar archivos de sonido en formato MP3 a la carpeta `sounds/` (ver instrucciones en `sounds/README.md`)

## Uso
1. Abrir el archivo `index.html` en un navegador web
2. Ajustar el volumen según sea necesario
3. Hacer clic en cualquiera de los botones de sonido para reproducirlo
4. Observar el visualizador de audio y los cambios de expresión del gato

## Estructura del Proyecto
```
miausound/
├── css/
│   ├── style.css        # Estilos principales
│   └── cat-face.css     # Estilos específicos para la cara del gato
├── js/
│   └── app.js           # Lógica de la aplicación
├── sounds/              # Carpeta para archivos de audio (no incluidos)
│   └── README.md        # Instrucciones para agregar sonidos
└── index.html           # Página principal
```

## Personalización
- Para agregar nuevos sonidos, añade archivos MP3 a la carpeta `sounds/` y actualiza los botones en `index.html`
- Para modificar las expresiones del gato, edita las definiciones en `js/app.js`
- Para cambiar los colores y el estilo visual, modifica las variables CSS en `css/style.css`

## Contribución
Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Hacer fork del proyecto
2. Crear una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto
Tu Nombre - [@tutwitter](https://twitter.com/tutwitter)
Link del proyecto: [https://github.com/tuusuario/miausound](https://github.com/tuusuario/miausound)