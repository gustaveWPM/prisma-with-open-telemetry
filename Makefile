.PHONY: all build initialize-db start install initialize-env initialize clean fclean re

MAKEFLAGS += --silent

PM := pnpm

ENV_EXAMPLE := .env.example
ENV_FILE := .env

DIST := ./dist/
ESLINT_CACHE := .eslintcache

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
			pnpx prisma migrate deploy && \
      pnpx prisma db seed; \
		fi \
	}

# @Override
start: initialize-db
	$(PM) run start

# @Mirror
install:
	$(PM) install

initialize-env:
	[ -e "$(ENV_FILE)" ] || cp "$(ENV_EXAMPLE)" "$(ENV_FILE)"

initialize: install initialize-env
	pnpx prisma generate

clean:
	$(PM) rimraf $(DIST)
	$(PM) rimraf $(ESLINT_CACHE)

fclean: clean
	$(PM) rimraf node_modules

re: fclean initialize build
