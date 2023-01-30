
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
	cd web/simple-app&&npm run serve --fix

vue-create_app:
	vue create