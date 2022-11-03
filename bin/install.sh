#!bin/sh

pnpm i;
cp ./.env.example ./.env

while getopts n:d:m:u:r flag
do
	case "${flag}" in
		n) name=${OPTARG};;
		d) description=${OPTARG};;
		m) main=${OPTARG};;
		u) user=${OPTARG};;
		r) repo=${OPTARG};;
	esac
done

if [ -z "$name" ]
then
	name="$( basename "$( pwd; )" | tr '[:upper:]' '[:lower:]')" 
fi

if [ -z "$description" ]
then
	description="Project generated with https://github.com/CReies/Node-Template.git"
fi

if [ -z "$main" ]
then
	main="index"
fi

if [ -z "$user" ]
then
	echo "Enter your github user"
	exit 1
fi

if [ -z "$repo" ]
then
	repo="$( basename "$( pwd; )" )"
fi

baseDir="$(dirname "$0")"
package="$baseDir/../package.json"
nodemon="$baseDir/../nodemon.json"
index="$baseDir/../src/index.ts"
readme="$baseDir/../README.md"

sed "2d;4d;5d;8d;19d" -i $package
sed "1 a \\\t\"name\": \"$name\"," -i $package
sed "3 a \\\t\"description\": \"$description\"," -i $package
sed "4 a \\\t\"main\": \".\/src\/$main.ts\"," -i $package
sed	"7 a \\\t\"start:prod\": \"node -r ts-node/register/transpile-only -r tsconfig-paths/register ./dist/src/$main.js\"," -i $package
sed	"18 a \\\t\t\"url\": \"https:\/\/github.com\/$user\/$repo.git\"" -i $package

sed "5d" -i $nodemon
sed "4 a \\\t\"exec\": \"ts-node -r tsconfig-paths/register ./src/$main.ts\"," -i $nodemon

sed "s/Index/$main/g" -i $index

git mv $index ./src/"$main".ts

rm $readme
touch $readme
echo "# $name" >> $readme
echo "" >> $readme
echo "$description" >> $readme

rm "$baseDir/install.sh"
