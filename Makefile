.PHONY: all build initialize-db install initialize-env initialize

MAKEFLAGS += --silent

PM := pnpm

ENV_EXAMPLE := .env.example
ENV_FILE := .env

INIT_MIGRATION_TMP_FILE := 0_init.tmp.23456789876543qsldklfjkhsqsjSQDFGHFDSQS

# @Mirror
%:
	$(PM) "$@"

# @Default
all: build

# @Override
build:
	$(PM) run build

initialize-db:
	@{ \
		mkdir -p prisma/migrations/0_init 2>/dev/null; \
		rm -f $(INIT_MIGRATION_TMP_FILE); \
		if [ -e "prisma/migrations/0_init/migration.sql" ]; then \
			: ; \
		else \
			pnpx prisma migrate diff \
				--from-empty \
				--to-schema-datamodel prisma/schema.prisma \
				--script > prisma/migrations/0_init/migration.sql 2>/dev/null && \
			echo 'create extension if not exists pgcrypto;' | cat - prisma/migrations/0_init/migration.sql > $(INIT_MIGRATION_TMP_FILE) && \
			rm -f prisma/migrations/0_init/migration.sql && \
			mv $(INIT_MIGRATION_TMP_FILE) prisma/migrations/0_init/migration.sql && \
			pnpx prisma migrate deploy; \
		fi \
	}

# @Mirror
install:
	$(PM) install

initialize-env:
	[ -e "$(ENV_FILE)" ] || cp "$(ENV_EXAMPLE)" "$(ENV_FILE)"

initialize: install initialize-env
	pnpx prisma generate
