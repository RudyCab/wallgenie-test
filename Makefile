# make deploy m="added makefile"
deploy:
	git add .
	git commit -m "$(if $(m),$(m),commit changes)"
	git push
	npm run deploy

npm-start-hard:
	rm -r -f node_modules
	npm i
	npm start