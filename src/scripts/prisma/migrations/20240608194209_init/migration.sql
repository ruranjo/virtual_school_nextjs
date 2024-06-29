-- CreateTable
CREATE TABLE "Rol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "gender" TEXT,
    "address" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profesor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "grado" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    CONSTRAINT "Profesor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Representante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    CONSTRAINT "Representante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "representanteId" INTEGER NOT NULL,
    CONSTRAINT "Estudiante_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "Representante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estudiante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFinal" DATETIME NOT NULL,
    "comentario" TEXT,
    "entregado" BOOLEAN NOT NULL,
    "aulaId" INTEGER NOT NULL,
    CONSTRAINT "Actividad_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Aula" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profesorId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    CONSTRAINT "Aula_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "actividadId" INTEGER NOT NULL,
    "profesorId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "ponderacion" REAL NOT NULL,
    CONSTRAINT "Nota_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nota_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nota_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EstudianteToAula" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EstudianteToAula_A_fkey" FOREIGN KEY ("A") REFERENCES "Aula" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EstudianteToAula_B_fkey" FOREIGN KEY ("B") REFERENCES "Estudiante" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_key" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_usuarioId_key" ON "Profesor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_codigo_key" ON "Profesor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Representante_usuarioId_key" ON "Representante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_usuarioId_key" ON "Estudiante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "_EstudianteToAula_AB_unique" ON "_EstudianteToAula"("A", "B");

-- CreateIndex
CREATE INDEX "_EstudianteToAula_B_index" ON "_EstudianteToAula"("B");
