
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/12/2021 15:09:52
-- Generated from EDMX file: C:\sourceCode\C# March 2021\SSV2\Models\SSDBV2.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [db_a732e3_ssbdv2];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------


-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Personas'
CREATE TABLE [dbo].[Personas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Nombres] nvarchar(max)  NOT NULL,
    [Apellidos] nvarchar(max)  NOT NULL,
    [TDoc_Id] int  NOT NULL,
    [NDoc] varchar(10)   NULL,
    [Activo] bit  NOT NULL,
    [Tp_Id] int  NOT NULL
);
GO

-- Creating table 'PersonaMaterias'
CREATE TABLE [dbo].[PersonaMaterias] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Materia_Id] int  NOT NULL,
    [Persona_Id] int  NOT NULL,
    [Notas_Materias_Id] int  NULL
);
GO

-- Creating table 'Materias'
CREATE TABLE [dbo].[Materias] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'NotasMaterias'
CREATE TABLE [dbo].[NotasMaterias] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Notas] float  NOT NULL,
    [Periodo_Id] int  NOT NULL
);
GO

-- Creating table 'TDocs'
CREATE TABLE [dbo].[TDocs] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Tipo] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'TipoPersonas'
CREATE TABLE [dbo].[TipoPersonas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Rol] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Periodoes'
CREATE TABLE [dbo].[Periodoes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [NombreP] nvarchar(max)  NOT NULL,
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Personas'
ALTER TABLE [dbo].[Personas]
ADD CONSTRAINT [PK_Personas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'PersonaMaterias'
ALTER TABLE [dbo].[PersonaMaterias]
ADD CONSTRAINT [PK_PersonaMaterias]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Materias'
ALTER TABLE [dbo].[Materias]
ADD CONSTRAINT [PK_Materias]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'NotasMaterias'
ALTER TABLE [dbo].[NotasMaterias]
ADD CONSTRAINT [PK_NotasMaterias]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TDocs'
ALTER TABLE [dbo].[TDocs]
ADD CONSTRAINT [PK_TDocs]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TipoPersonas'
ALTER TABLE [dbo].[TipoPersonas]
ADD CONSTRAINT [PK_TipoPersonas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Periodoes'
ALTER TABLE [dbo].[Periodoes]
ADD CONSTRAINT [PK_Periodoes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [TDoc_Id] in table 'Personas'
ALTER TABLE [dbo].[Personas]
ADD CONSTRAINT [FK_PersonaTDoc]
    FOREIGN KEY ([TDoc_Id])
    REFERENCES [dbo].[TDocs]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER  TABLE  [dbo].[Personas] WITH CHECK 
   ADD CONSTRAINT [UQ_MyTable_Document] UNIQUE ([NDoc])

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaTDoc'
CREATE INDEX [IX_FK_PersonaTDoc]
ON [dbo].[Personas]
    ([TDoc_Id]);
GO

-- Creating foreign key on [Tp_Id] in table 'Personas'
ALTER TABLE [dbo].[Personas]
ADD CONSTRAINT [FK_PersonaTipoPersona]
    FOREIGN KEY ([Tp_Id])
    REFERENCES [dbo].[TipoPersonas]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaTipoPersona'
CREATE INDEX [IX_FK_PersonaTipoPersona]
ON [dbo].[Personas]
    ([Tp_Id]);
GO

-- Creating foreign key on [Persona_Id] in table 'PersonaMaterias'
ALTER TABLE [dbo].[PersonaMaterias]
ADD CONSTRAINT [FK_PersonaPersonaMateria]
    FOREIGN KEY ([Persona_Id])
    REFERENCES [dbo].[Personas]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaPersonaMateria'
CREATE INDEX [IX_FK_PersonaPersonaMateria]
ON [dbo].[PersonaMaterias]
    ([Persona_Id]);
GO

-- Creating foreign key on [Materia_Id] in table 'PersonaMaterias'
ALTER TABLE [dbo].[PersonaMaterias]
ADD CONSTRAINT [FK_PersonaMateriaMateria]
    FOREIGN KEY ([Materia_Id])
    REFERENCES [dbo].[Materias]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaMateriaMateria'
CREATE INDEX [IX_FK_PersonaMateriaMateria]
ON [dbo].[PersonaMaterias]
    ([Materia_Id]);
GO

-- Creating foreign key on [Notas_Materias_Id] in table 'PersonaMaterias'
ALTER TABLE [dbo].[PersonaMaterias]
ADD CONSTRAINT [FK_PersonaMateriaNotasMateria]
    FOREIGN KEY ([Notas_Materias_Id])
    REFERENCES [dbo].[NotasMaterias]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaMateriaNotasMateria'
CREATE INDEX [IX_FK_PersonaMateriaNotasMateria]
ON [dbo].[PersonaMaterias]
    ([Notas_Materias_Id]);
GO

-- Creating foreign key on [Periodo_Id] in table 'NotasMaterias'
ALTER TABLE [dbo].[NotasMaterias]
ADD CONSTRAINT [FK_NotasMateriaPeriodo]
    FOREIGN KEY ([Periodo_Id])
    REFERENCES [dbo].[Periodoes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NotasMateriaPeriodo'
CREATE INDEX [IX_FK_NotasMateriaPeriodo]
ON [dbo].[NotasMaterias]
    ([Periodo_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------