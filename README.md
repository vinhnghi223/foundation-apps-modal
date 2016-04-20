foundation-apps-modal
======================

[Zurb Foundation-apps modal](http://foundation.zurb.com/apps/docs/#!/modal) with angular promises.

1. [Install](#install)
2. [Usage](#usage)

## Install

Install with Bower:

```
bower install foundation-apps-modal
```

Reference the script:

```html
<script src="bower_components\foundation-apps-modal\foundation-apps-modal.js"></script>
```

Add the module zfaModal as a dependency to your application:

```js
var app = angular.module('myapp', ['zfaModal']);
```

## Usage

### 1

Define modal in your custom controller:

```js
angular.module('myapp')
    .controller('somePageController', somePageController);

    function somePageController(zfaModal) { // <-- inject modal provider into controller

        var vm = this;

        vm.openModal = function () {

        var modalPromise = zfaModal.open('exampleModal',{
            exampleMessage : 'Cheers!'
        });

        modalPromise.then(function (response) { // <-- example of handling promises
            vm.result = response;
        })
        .catch(function () { /* write your error handler */ });
        }
    }
```

### 2

Define provider's config of your modal. You are free to choose any name of the modal, controller, template and local variables.

```
angular.module('myapp')
    .controller('someModalController', someModalController)
    .config(function(zfaModalProvider) {

        zfaModalProvider.register('exampleModal', { // <-- modal name
            controller: 'someModalController', // <-- link to modal controller
            templateUrl: 'common-ui/docs/ndModal/someModal.tpl.html', // <-- link to modal template
            locals: {
                exampleMessage: '' // <-- injection locals for modal controller
            }
        });
    }]);
```

#### Modal options

* `controller`: Modal controller.
* `templateUrl`: Modal template url.
* `template`: Modal template.
* `locals`: Injection locals for modal controller.

### 3
Set up modal controller this way:

```
function someModalController($scope, exampleMessage, zfaModalDefer, zfaModalProvider) {
    $scope.exampleMessage = exampleMessage; // <-- $scope locals you may need in modal

    $scope.close = function () {
        zfaModalProvider.close();
    //  zfaModalDefer.resolve('all is good!'); // <-- another way to close modal
    }
}
```

Use `zfaModalDefer.resolve();` and `zfaModalDefer.reject();` inside modal controller to close modal programmatically.

### 4

4) Set up modal template this way:

```
<div zf-modal="" class="some-modal">
    <a class="close-button" ng-click="close()>×</a>
    <h3>Hello World!</h3>
    {{ exampleMessage }'}
</div>
```

Include `zf-modal` attribute to parent tag of your template. There is also set of predefined attributes, which you are free to use inside modal templates. Check also Foundation for Apps [site](http://foundation.zurb.com/apps/docs/#!/modal).
* zf-close
* zf-open
* zf-toggle
* zf-esc-close
* zf-swipe-close
* zf-hard-toggle
* zf-close-all

### 5

Change styling of modal:

```
.some-modal { // <-- styling of overlay
}
  .modal { // <-- styling of modal
  }
}

### 6
Predefined modals

#### Alert

```js
zfaModal.alert({ message: "Alert!!!" })
    .then(function() { /* ... */ })
    .catch(function() { /* ... */ });
```

locals:
* `message`: Alert message.
* `ok`: Ok button text.

#### Confirm

```js
zfaModal.confirm({ message: "Confirm?" })
    .then(function() { /* ... */ })
    .catch(function() { /* ... */ });
```

locals:
* `message`: Confirm message.
* `ok`: Ok button text.
* `cancel`: Cancel button text.

#### Prompt

```js
zfaModal.prompt({ message: "Type your text:" })
    .then(function(value) { /* ... */ })
    .catch(function() { /* ... */ });
```

locals:
* `message`: Prompt message.
* `value`: Input value.
* `ok`: Ok button text.
* `cancel`: Cancel button text.