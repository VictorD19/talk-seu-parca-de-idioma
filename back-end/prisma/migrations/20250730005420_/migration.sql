-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "linguagem_preferida" TEXT NOT NULL,
    "tipo_mensagem_preferida" TEXT NOT NULL,
    "genero_agente" TEXT NOT NULL,
    "nome_agente" TEXT NOT NULL DEFAULT 'Talka',
    "thread_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "sender" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agent_configs" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "prompt_base" TEXT NOT NULL,

    CONSTRAINT "agent_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telefone_key" ON "public"."users"("telefone");

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
