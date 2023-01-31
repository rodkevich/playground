
go-requirements-reset:
	git checkout -- go.mod
	go mod tidy
	go mod vendor

go-requirements-tidy:
	go mod tidy
	go mod vendor

go-requirements-upgrade:
	# go get $(go list -f '{{if not (or .Main .Indirect)}}{{.Path}}{{end}}' -m all)
	go get -u -t -d -v ./...
	go mod tidy
	go mod vendor

go-requirements-clean_cache:
	go clean -modcache

python-env-create:
	python3 -m venv .venv

python-env-install:
	pip install -r requirements.txt

python-env-activate:
	source .venv/bin/activate

python-requirements-freeze:
	pip freeze > requirements.txt

pw-install:
	playwright install

web-run-simple_app:
	cd web/simple-app&&npm run serve

vue-create_app:
	vue create

cypress-app-run-dev:
	cd web/cypress-app && npm run dev

cypress-test-open:
	cd web/cypress-app && npx cypress open