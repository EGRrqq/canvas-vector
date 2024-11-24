## canvas-vector

<p align="center">
  <a align="center" target="_blank" href="https://egrrqq.github.io/canvas-vector"><b>Лайв версия</b></a>
</p>

## стек

- vanilla js + jsdoc (без билда и компиляции типов)

## по проекту

- Упор на модульность, старался придерживаться плоской структуры папок. Логика отделена от UI.
- Дизайн архитектуры канваса.
  - Board - ответственен за сам канвас, главный строительный блок. Использует блоки, описанные ниже.
  - Draw - это базовые примитивы (квадрат, линия, картинка) + настройки для них, вынесенные отдельно для удобного переиспользования.
  - Toolbox - он управляет полноценными инструментами, построенными на базе Draw-примитивов. Все события определены в одном месте, и они сохраняют свои данные в объекте events. Каждый инструмент обращается к этому объекту и достает из него необходимые данные. То есть для каждого инструмента не нужно будет создавать события. При выборе нужного инструмента (setActiveTool) просто вызывается автоматом функция init для этого инструмента, и он сразу готов к использованию. Задел на будущую панель инструментов.
  - View - управляет очисткой и ресайзом канваса, чтобы не было блюра при зуме.
  - Ctx - тут вся логика, связанная с контекстом, set и get операции.
  - UI - тут хранится логика, связанная с интерфейсом, найти элементы по id (id - это параметр) + события для них.
  - Models - там определены типы для их переиспользования.

## по задачам

- Курсор магнитится на hover, а когда наводишься на первую точку, она подсвечивается синим для улучшения UX.
- Диван перемещается в пределах комнаты и магнитится (только своим центром), чтобы он прилипал именно зеленой стороной. Я пытался правильно высчитать offset:

  1. Определить вектор, который указывает на центр зеленой грани при нулевом повороте.
  2. Повернуть этот вектор на угол поворота картинки.
  3. Использовать повернутый вектор для определения нового положения центра зеленой грани.<br/><br/>Например:

  ```
  const calculateGreenEdgeCenter = (width, height, angle) => {
    // Вектор для зеленой грани при нулевом повороте
    const originalVector = { x: 0, y: -height / 2 };

    // Преобразуем угол в радианы
    const angleRad = angle * (Math.PI / 180);

    // Поворачиваем вектор на угол поворота
    const rotatedX = originalVector.x * Math.cos(angleRad) - originalVector.y * Math.sin(angleRad);
    const rotatedY = originalVector.x * Math.sin(angleRad) + originalVector.y * Math.cos(angleRad);

    // Возвращаем повернутый вектор
    return { x: rotatedX, y: rotatedY };
  };
  ```

  В итоге картинка либо дергалась резко, либо магнитилась к воздуху. Я хотел бы получить комментарий о том, как правильно высчитать offset.

- Диван разворачивается зеленой стороной к стенке + я отрендерил магнитные точки на каждой стенке.
- Для кнопки "Начать" добавил простую анимацию на клик.
- Для проверки, находится ли точка внутри комнаты, используется алгоритм ray-tracing.