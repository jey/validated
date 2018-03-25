#!/bin/sh
../node_modules/.bin/flow dump-types --pretty case1/test_flow.js | sed -e "s/case1/caseN/g" > case1.types
../node_modules/.bin/flow dump-types --pretty case2/test_flow.js | sed -e "s/case2/caseN/g" > case2.types
diff -u case1.types case2.types > types.diff
diff -ur case1/ case2/ > sources.diff
