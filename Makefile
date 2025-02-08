HUGO_VERSION=0.121.2

serve: #check-hugo
	@bin/hugo server --buildDrafts --buildFuture

deploy: check-hugo
	@bin/deploy.sh

check-hugo:
	@./bin/hugo version | grep -q "$(HUGO_VERSION)" || { \
		echo "Hugo version mismatch, expecting $(HUGO_VERSION), got this instead:"; \
		echo; \
		./bin/hugo version; \
		echo; \
		exit 1; \
	}

setup-hugo:
	mkdir -p /tmp/hugo-$(HUGO_VERSION)
	curl -L https://github.com/gohugoio/hugo/releases/download/v$(HUGO_VERSION)/hugo_$(HUGO_VERSION)_darwin-universal.tar.gz \
		-o /tmp/hugo.tar.gz \
	| tar -xvf /tmp/hugo.tar.gz -C /tmp/hugo-$(HUGO_VERSION)
	cp -f /tmp/hugo-$(HUGO_VERSION)/hugo ./bin/hugo
	rm -rf /tmp/hugo-$(HUGO_VERSION)
	chmod +x ./bin/hugo
