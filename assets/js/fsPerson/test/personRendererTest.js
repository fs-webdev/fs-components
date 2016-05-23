var expect = chai.expect;

// run tests using angular directives instead of fsModules function calls
var isAngularTest = window.isAngularTest || false;

var personObj = {
  name: 'John Doe',
  gender: 'MALE',
  id: '1234-567',
  lifeSpan: '1900-1960',
  fullLifeSpan: '1 January 1900 &ndash; 1 December 1960',
  birthPlace: 'Smallville, Kansas',
  nameConclusion: {
    details: {
      style: 'EUROTYPIC',
      nameForms: [{
        givenPart: 'John',
        familyPart: 'Doe'
      }]
    }
  },
  portraitUrl: 'http://familysearch.org/portrait'
};

var person2 = {
  name: 'Jane Doe',
  gender: 'FEMALE',
  id: 'bdfg-hjk',
  lifeSpan: '1920-1980',
  fullLifeSpan: '11 January 1920 &ndash; 11 December 1980',
  birthPlace: 'Gotham City',
  nameConclusion: {
    details: {
      style: 'EUROTYPIC',
      nameForms: [{
        givenPart: 'Jane',
        familyPart: 'Doe'
      }]
    }
  },
  portraitUrl: 'http://familysearch.org/portrait_female'
};

var noNamePerson = fsModules.extend({}, personObj, {
    name: null,
    nameConclusion: {
      details: {
        style: 'EUROTYPIC',
        nameForms: [{
          givenPart: null,
          familyPart: null
        }]
      }
    }
  });
var nameWithSpacePerson = fsModules.extend({}, personObj, {name: " "});
var noIdPerson = fsModules.extend({}, personObj, {id: null});
var noNameConclusionPerson = fsModules.extend({}, personObj, {nameConclusion: null});
var noPortraitPerson = fsModules.extend({}, personObj, {portraitUrl: null});
var parentsAndSpousePerson = fsModules.extend({}, personObj, {
    fatherId: "FATHER-ID",
    motherId: "MOTHER-ID",
    spouseId: "SPOUSE-ID"
});
var onlyOneParentPerson = fsModules.extend({}, personObj, {
    fatherId: "FATHER-ID"
});
var onlySpousePerson = fsModules.extend({}, personObj, {
    spouseId: "SPOUSE-ID"
});





//--------------------------------------------------
// fsPerson
//--------------------------------------------------
describe('fsPerson', function () {
  var $template, person;

  // set up the angular module
  if (isAngularTest) {
    var $compile;
    var $scope;
    var $$asyncCallback;
    var $timeout;

    beforeEach(window.module('ngFsModules'));
    beforeEach(window.module('pasvaz.bindonce'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$$asyncCallback_, _$timeout_){
      $compile = _$compile_;
      $scope = _$rootScope_;
      $$asyncCallback = _$$asyncCallback_;
      $timeout = _$timeout_;
    }));

    function compileDirective(template) {
      $template = $compile(template)($scope)[0];
      $("body").append($template);
      $scope.$apply();
      $$asyncCallback.flush();
    }
  }

  // reset person object for every test
  beforeEach(function() {
    person = JSON.parse(JSON.stringify(personObj));
  });

  afterEach(function() {
    $("body").empty();
  });





  //--------------------------------------------------
  // fsPerson.fsPersonVitals
  //--------------------------------------------------
  describe('fsPerson.fsPersonVitals', function() {

    it('should output the correct values with default options', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person);
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.be.a('null');
    });

    it('should display "[Unknown Name]" if there is no name', function() {
      if (isAngularTest) {
        $scope.person = noNamePerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(noNamePerson);
      }

      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;

      expect(fullName, "Full name should be [Unknown Name]").to.equal('[Unknown Name]');
      expect(givenName, "Given name should be [Unknown Name]").to.equal('[Unknown Name]');
      expect(familyName, "Family name should be &nbsp;").to.equal(FS.htmlDecode('&nbsp;'));
    });

    it('should display "[Unknown Name]" if there is a name with a space', function() {
      if (isAngularTest) {
        $scope.person = nameWithSpacePerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(nameWithSpacePerson);
      }

      var fullName = $template.querySelector('[data-test="full-name"]').textContent;

      expect(fullName).to.equal('[Unknown Name]');
    });

    it('should not include the id if options.hideId is true', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{hideId: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {hideId: true});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]');
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.be.a('null');;
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.be.a('null');
    });

    it('should not include the id if there is none', function() {
      if (isAngularTest) {
        $scope.person = noIdPerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(noIdPerson);
      }

      var pid = $template.querySelector('[data-test="pid"]');

      expect(pid).to.be.a('null');
    });

    it('should not include the lifeSpan if options.hideLifeSpan is true', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{hideLifeSpan: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {hideLifeSpan: true});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]');
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.be.a('null');
      expect(birthPlace).to.be.a('null');
    });

    it('should not include the lifeSpan or id if options.hideLifeSpan and options.hideId are true', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{hideLifeSpan: true, hideId: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {hideLifeSpan: true, hideId: true});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]');
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]');
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.be.a('null');
      expect(lifeSpan).to.be.a('null');
      expect(birthPlace).to.be.a('null');
    });

    it('should not include the given and family names if there is no nameConclusion', function() {
      if (isAngularTest) {
        $scope.person = noNameConclusionPerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(noNameConclusionPerson);
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]');
      var familyName = $template.querySelector('[data-test="family-name"]');
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.be.a('null');
      expect(familyName).to.be.a('null');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.be.a('null');
    });

    it('should have an anchor tag tag with data-cmd="openPersonCard" if options.openPersonCard is true', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {openPersonCard: true});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.not.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.be.a('null');
      expect(personCard.href.indexOf(person.id)).to.not.equal(-1);
    });

    it('should not have an anchor tag with data-cmd="openPersonCard" if options.openPersonCard is not passed in, but options.openPersonPage is', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {openPersonPage: true});
      }

      var personCard = $template.querySelector('a[data-cmd]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.not.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.be.a('null');
      expect(personCard.href.indexOf(person.id)).to.not.equal(-1);
    });

    it('should not have an anchor tag if options.openPersonCard or options.openPersonPage are not passed in', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {});
      }

      var personCard = $template.querySelector('a[data-cmd]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.be.a('null');
    });

    it('should have an h3 tag with options.nameWrapper is h3', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{nameWrapper: \'h3\'}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {nameWrapper: "h3"});
      }

      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');
      var wrapper = $template.querySelector('h3');

      expect(fullName, "full name was incorrect").to.equal(person.name);
      expect(givenName, "given name was incorrect").to.equal('John');
      expect(familyName, "family name was incorrect").to.equal('Doe');
      expect(pid, "pid was incorrect").to.equal(person.id);
      expect(lifeSpan, "lifespan was incorrect").to.equal(person.lifeSpan);
      expect(birthPlace, "birthPlace was not null").to.be.a('null');
      expect(wrapper, "wrapper was not set").to.not.be.a('null');
    });

    it('should output the full lifespan if options.lifeSpan is "long"', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{lifeSpan: \'long\'}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {lifeSpan: 'long'});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]');

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal('1 January 1900 – 1 December 1960');
      expect(birthPlace).to.be.a('null');
    });

    it('should output the birthPlace if options.showBirthPlace is true', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{showBirthPlace: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {showBirthPlace: true});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;
      var birthPlace = $template.querySelector('[data-test="birthPlace"]').textContent;

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
      expect(birthPlace).to.equal('Smallville, Kansas');
    });

    it('persons with encoded name should create parsible data-cmd-data for the person card', function() {
      // name comes from db encoded
      person.name = 'Angelo &quot;Snaps&quot; Provolone';

      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {openPersonCard: true});
      }

      var cmdData = $template.querySelector('a[data-cmd="openPersonCard"]').getAttribute('data-cmd-data');

      // parse cmd data to try to throw error
      function parseData() {
        return JSON.parse(cmdData);
      }

      expect(parseData).to.not.throw(Error);
    });

    it('persons with encoded name should render the name correctly', function() {
      // name comes from db encoded
      person.name = 'Angelo &quot;Snaps&quot; Provolone';
      person.nameConclusion.details.nameForms[0] = {
        givenPart: 'Angelo &quot;Snaps&quot;',
        familyPart: 'Provolone'
      };

      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true, lifeSpan: \'long\'}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {openPersonCard: true, lifeSpan: 'long'});
      }

      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;

      expect(fullName).to.equal('Angelo "Snaps" Provolone');
      expect(givenName).to.equal('Angelo "Snaps"');
      expect(familyName).to.equal('Provolone');
    });

    it('persons with encoded name should render the title correctly', function() {
      // name comes from db encoded
      person.name = 'Angelo &quot;Snaps&quot; Provolone';

      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(person, {openPersonCard: true});
      }

      var title = $template.querySelector('[title]').getAttribute('title');

      expect(title).to.equal('Angelo "Snaps" Provolone\n1900-1960 • 1234-567');
    });

    it('should include father, mother and spouse ID\'s in scope.personPageLink and data-cmd-data', function() {
      if (isAngularTest) {
        $scope.person = parentsAndSpousePerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true, father: \'FATHER-ID\', mother: \'MOTHER-ID\', spouse: \'SPOUSE-ID\'}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(parentsAndSpousePerson, {openPersonCard: true, father: "FATHER-ID", mother: "MOTHER-ID", spouse: "SPOUSE-ID"});
      }

      var personPageLink = $template.querySelector('.fs-person-vitals__link').href;
      var dataCmdData = $template.querySelector('.fs-person-vitals__link').getAttribute("data-cmd-data");

      expect(personPageLink, 'scope.personPageLink set incorrectly').to.contain('/tree/#view=ancestor&person=1234-567&spouse=SPOUSE-ID&parents=FATHER-ID_MOTHER-ID');
      expect(dataCmdData, 'data-cmd-data set incorrectly').to.equal('{"id":"1234-567","name":"John Doe","fatherId":"FATHER-ID","motherId":"MOTHER-ID","spouseId":"SPOUSE-ID","gender":"MALE"}');
    });

    it('should handle single parents when setting parent ID\'s in scope.personPageLink and data-cmd-data', function() {
      if (isAngularTest) {
        $scope.person = onlyOneParentPerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true, father: \'FATHER-ID\'}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(onlyOneParentPerson, {openPersonCard: true, father: "FATHER-ID"});
      }

      var personPageLink = $template.querySelector('.fs-person-vitals__link').href;
      var dataCmdData = $template.querySelector('.fs-person-vitals__link').getAttribute("data-cmd-data");

      expect(personPageLink, 'scope.personPageLink set incorrectly').to.contain('/tree/#view=ancestor&person=1234-567&parents=FATHER-ID_UNKNOWN');
      expect(dataCmdData, 'data-cmd-data set incorrectly').to.equal('{"id":"1234-567","name":"John Doe","fatherId":"FATHER-ID","gender":"MALE"}');
    });

    it('should handle just a spouse when setting spouse ID in scope.personPageLink and data-cmd-data', function() {
      if (isAngularTest) {
        $scope.person = onlySpousePerson;
        compileDirective('<fs-person-vitals data-person="person" bindonce="person" data-config="{openPersonCard: true, spouse: \'SPOUSE-ID\'}"></fs-person-vitals>');
      }
      else {
        $template = fsModules.fsPersonVitals(onlySpousePerson, {openPersonCard: true, spouse: "SPOUSE-ID"});
      }

      var personPageLink = $template.querySelector('.fs-person-vitals__link').href;
      var dataCmdData = $template.querySelector('.fs-person-vitals__link').getAttribute("data-cmd-data");

      expect(personPageLink, 'scope.personPageLink set incorrectly').to.contain('/tree/#view=ancestor&person=1234-567&spouse=SPOUSE-ID');
      expect(dataCmdData, 'data-cmd-data set incorrectly').to.equal('{"id":"1234-567","name":"John Doe","spouseId":"SPOUSE-ID","gender":"MALE"}');
    });

  });





  //--------------------------------------------------
  // fsPerson.fsPersonGender
  //--------------------------------------------------
  describe('fsPerson.fsPersonGender', function() {

    it('should output the correct values with default options', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-gender data-person="person"></fs-person-gender>');
      }
      else {
        $template = fsModules.fsPersonGender(person);
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
    });

    it('should transfer options properly', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-gender data-person="person" data-config="{hideId: true}"></fs-person-gender>');
      }
      else {
        $template = fsModules.fsPersonGender(person, {hideId: true});
      }

      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]');
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;

      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.be.a('null');
      expect(lifeSpan).to.equal(person.lifeSpan);
    });

  });





  //--------------------------------------------------
  // fsPerson.fsPersonPortrait
  //--------------------------------------------------
  describe('fsPerson.fsPersonPortrait', function() {

    it('should output the correct values with default options', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-portrait data-person="person"></fs-person-portrait>');
      }
      else {
        $template = fsModules.fsPersonPortrait(person);
      }

      var portrait = $template.querySelector('img');
      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]').textContent;
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;

      expect(portrait).to.not.be.a('null');
      expect(portrait.getAttribute('src')).to.equal(person.portraitUrl);
      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.equal(person.id);
      expect(lifeSpan).to.equal(person.lifeSpan);
    });

    it('should transfer options properly', function() {
      if (isAngularTest) {
        $scope.person = person;
        compileDirective('<fs-person-portrait data-person="person" data-config="{hideId: true}"></fs-person-portrait>');
      }
      else {
        $template = fsModules.fsPersonPortrait(person, {hideId: true});
      }

      var portrait = $template.querySelector('img');
      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]');
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;

      expect(portrait).to.not.be.a('null');
      expect(portrait.getAttribute('src')).to.equal(person.portraitUrl);
      expect(personCard).to.be.a('null');
      expect(fullName).to.equal(person.name);
      expect(givenName).to.equal('John');
      expect(familyName).to.equal('Doe');
      expect(pid).to.be.a('null');
      expect(lifeSpan).to.equal(person.lifeSpan);
    });

    it('should not include the portrait if there is none', function() {
      if (isAngularTest) {
        $scope.person = noPortraitPerson;
        compileDirective('<fs-person-portrait data-person="person"></fs-person-portrait>');
      }
      else {
        $template = fsModules.fsPersonPortrait(noPortraitPerson);
      }

      var portrait = $template.querySelector('img');

      expect(portrait).to.be.a('null');
    });

  });





  //--------------------------------------------------
  // fsPerson.fsCoupleInfo
  //--------------------------------------------------
  describe('fsPerson.fsCoupleInfo', function() {

    it('should output the correct values with default options', function() {
      if (isAngularTest) {
        $scope.person = person;
        $scope.person2 = person2;
        compileDirective('<fs-couple-info data-husband="person" data-wife="person2" bindonce="person"></fs-couple-info>');
      }
      else {
        $template = fsModules.fsCoupleInfo(person, person2);
      }

      var personCard = $template.querySelectorAll('a[data-cmd="openPersonCard"]');
      var fullNames = $template.querySelectorAll('[data-test="full-name"]');
      var givenNames = $template.querySelectorAll('[data-test="given-name"]');
      var familyNames = $template.querySelectorAll('[data-test="family-name"]');
      var pids = $template.querySelectorAll('[data-test="pid"]');
      var lifeSpans = $template.querySelectorAll('[data-test="lifeSpan"]');

      expect(personCard.length).to.equal(0);

      // test husband data
      expect(fullNames[0].textContent).to.equal(person.name);
      expect(givenNames[0].textContent).to.equal('John');
      expect(familyNames[0].textContent).to.equal('Doe');
      expect(pids[0].textContent).to.equal(person.id);
      expect(lifeSpans[0].textContent).to.equal(person.lifeSpan);

      // test wife data
      expect(fullNames[1].textContent).to.equal(person2.name);
      expect(givenNames[1].textContent).to.equal('Jane');
      expect(familyNames[1].textContent).to.equal('Doe');
      expect(pids[1].textContent).to.equal(person2.id);
      expect(lifeSpans[1].textContent).to.equal(person2.lifeSpan);
    });

    it('should transfer options properly to both persons', function() {
      if (isAngularTest) {
        $scope.person = person;
        $scope.person2 = person2;
        compileDirective('<fs-couple-info data-husband="person" data-wife="person2" data-config="{hideId: true}"></fs-couple-info>');
      }
      else {
        $template = fsModules.fsCoupleInfo(person, person2, {hideId: true});
      }

      var portrait = $template.querySelector('img');
      var personCard = $template.querySelector('a[data-cmd="openPersonCard"]');
      var fullName = $template.querySelector('[data-test="full-name"]').textContent;
      var givenName = $template.querySelector('[data-test="given-name"]').textContent;
      var familyName = $template.querySelector('[data-test="family-name"]').textContent;
      var pid = $template.querySelector('[data-test="pid"]');
      var lifeSpan = $template.querySelector('[data-test="lifeSpan"]').textContent;

      var personCard = $template.querySelectorAll('a[data-cmd="openPersonCard"]');
      var fullNames = $template.querySelectorAll('[data-test="full-name"]');
      var givenNames = $template.querySelectorAll('[data-test="given-name"]');
      var familyNames = $template.querySelectorAll('[data-test="family-name"]');
      var pids = $template.querySelectorAll('[data-test="pid"]');
      var lifeSpans = $template.querySelectorAll('[data-test="lifeSpan"]');

      expect(personCard.length).to.equal(0);
      expect(pids.length).to.equal(0);

      // test husband data
      expect(fullNames[0].textContent).to.equal(person.name);
      expect(givenNames[0].textContent).to.equal('John');
      expect(familyNames[0].textContent).to.equal('Doe');
      expect(lifeSpans[0].textContent).to.equal(person.lifeSpan);

      // test wife data
      expect(fullNames[1].textContent).to.equal(person2.name);
      expect(givenNames[1].textContent).to.equal('Jane');
      expect(familyNames[1].textContent).to.equal('Doe');
      expect(lifeSpans[1].textContent).to.equal(person2.lifeSpan);
    });

  });




  //--------------------------------------------------
  // fsPerson.fsCouplePortrait
  //--------------------------------------------------
  describe('fsPerson.fsCouplePortrait', function() {

    it('should output the correct values with default options', function() {
      if (isAngularTest) {
        $scope.person = person;
        $scope.person2 = person2;
        compileDirective('<fs-couple-portrait data-husband="person" data-wife="person2" bindonce="person"></fs-couple-portrait>');
      }
      else {
        $template = fsModules.fsCouplePortrait(person, person2);
      }

      var personCard = $template.querySelectorAll('a[data-cmd="openPersonCard"]');
      var fullNames = $template.querySelectorAll('[data-test="full-name"]');
      var givenNames = $template.querySelectorAll('[data-test="given-name"]');
      var familyNames = $template.querySelectorAll('[data-test="family-name"]');
      var pids = $template.querySelectorAll('[data-test="pid"]');
      var lifeSpans = $template.querySelectorAll('[data-test="lifeSpan"]');
      var birthPlaces = $template.querySelectorAll('[data-test="birthPlace"]');

      expect(personCard.length).to.equal(0);

      // test husband data
      expect(fullNames[0].textContent).to.equal(person.name);
      expect(givenNames[0].textContent).to.equal('John');
      expect(familyNames[0].textContent).to.equal('Doe');
      expect(pids[0].textContent).to.equal(person.id);
      expect(lifeSpans[0].textContent).to.equal(person.lifeSpan);
      expect(birthPlaces[0]).to.be.a('undefined');

      // test wife data
      expect(fullNames[1].textContent).to.equal(person2.name);
      expect(givenNames[1].textContent).to.equal('Jane');
      expect(familyNames[1].textContent).to.equal('Doe');
      expect(pids[1].textContent).to.equal(person2.id);
      expect(lifeSpans[1].textContent).to.equal(person2.lifeSpan);
      expect(birthPlaces[1]).to.be.a('undefined');
    });

    it('should transfer options properly to both persons', function() {
      if (isAngularTest) {
        $scope.person = person;
        $scope.person2 = person2;
        compileDirective('<fs-couple-portrait data-husband="person" data-wife="person2" data-config="{hideId: true}"></fs-couple-portrait>');
      }
      else {
        $template = fsModules.fsCouplePortrait(person, person2, {hideId: true});
      }

      var personCards = $template.querySelectorAll('a[data-cmd="openPersonCard"]');
      var fullNames = $template.querySelectorAll('[data-test="full-name"]');
      var givenNames = $template.querySelectorAll('[data-test="given-name"]');
      var familyNames = $template.querySelectorAll('[data-test="family-name"]');
      var pids = $template.querySelectorAll('[data-test="pid"]');
      var lifeSpans = $template.querySelectorAll('[data-test="lifeSpan"]');
      var birthPlaces = $template.querySelectorAll('[data-test="birthPlace"]');

      expect(personCards.length).to.equal(0);
      expect(pids.length).to.equal(0);

      // test husband data
      expect(fullNames[0].textContent).to.equal(person.name);
      expect(givenNames[0].textContent).to.equal('John');
      expect(familyNames[0].textContent).to.equal('Doe');
      expect(lifeSpans[0].textContent).to.equal(person.lifeSpan);
      expect(birthPlaces[0]).to.be.an('undefined');

      // test wife data
      expect(fullNames[1].textContent).to.equal(person2.name);
      expect(givenNames[1].textContent).to.equal('Jane');
      expect(familyNames[1].textContent).to.equal('Doe');
      expect(lifeSpans[1].textContent).to.equal(person2.lifeSpan);
      expect(birthPlaces[1]).to.be.an('undefined');
    });

  });
});
